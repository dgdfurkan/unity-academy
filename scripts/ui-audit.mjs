/**
 * Arayüz denetimi. Headless Chrome açar, her kırılım noktasında sayfayı yükler,
 * ölçer ve ekran görüntüsü alır.
 *
 *   node scripts/ui-audit.mjs http://localhost:3000
 *
 * Denetlenen:
 *   - yatay kaydırma ve görünümü taşan öğeler
 *   - 44px altındaki dokunma hedefleri
 *   - erişilebilir adı olmayan butonlar ve bağlantılar
 *   - alt metni olmayan görseller
 *
 * Çıktı: .audit/<genislik>.png ve terminalde rapor. Hata varsa çıkış kodu 1.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_ARG = process.argv[2] ?? "http://localhost:3000";
// --auth[=student|instructor]: korumalı sayfaları denetlemek için sayfa
// açılmadan önce oturum yazar.
const AUTH_ARG = process.argv.find((a) => a.startsWith("--auth"));
const AUTH_ROLE = AUTH_ARG?.split("=")[1] ?? (AUTH_ARG ? "student" : null);
const OUT_DIR = ".audit";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/** [etiket, genişlik, yükseklik, mobil mi] */
const VIEWPORTS = [
  ["phone-375", 375, 812, true],
  ["phone-414", 414, 896, true],
  ["tablet-768", 768, 1024, true],
  ["laptop-1024", 1024, 768, false],
  ["desktop-1440", 1440, 900, false],
];

// Sayfanın kendi kaydırma alanı olan öğeler taşma sayılmaz.
const AUDIT = (minTarget) => `(() => {
  const issues = [];
  const MIN_TARGET = ${minTarget};
  const vw = document.documentElement.clientWidth;

  const docOverflow = document.documentElement.scrollWidth - vw;
  if (docOverflow > 1) issues.push({ kind: "yatay-kaydirma", detail: docOverflow + "px" });

  // Kasıtlı yatay kaydırma alanı (kod bloğu, tablo) taşma sayılmaz.
  // overflow:hidden/clip taşmayı gizler ama düzeltmez, o yüzden sayılır.
  const inScrollRegion = (el) => {
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const o = getComputedStyle(n).overflowX;
      if (o === "auto" || o === "scroll") return true;
    }
    return false;
  };

  // Dekoratif katmanlar (ışık, arka plan) kasıtlı olarak taşar.
  const decorative = (el) => el.closest('[aria-hidden="true"]') !== null;

  // Ekran okuyucuya özel gizli öğeler görsel hedef değildir.
  const visuallyHidden = (el) => {
    const cs = getComputedStyle(el);
    return cs.clipPath === "inset(50%)" || cs.clip === "rect(0px, 0px, 0px, 0px)";
  };

  // Erişilebilir ad: aria-label, aria-labelledby, bağlı <label>, sarmalayan
  // <label>, title ya da metin içeriği. Form alanlarının adı genellikle
  // <label for> üzerinden gelir, yalnızca metne bakmak yanlış alarm üretir.
  const label = (el) => {
    const aria = el.getAttribute("aria-label");
    if (aria?.trim()) return aria.trim().slice(0, 40);

    const labelledBy = el.getAttribute("aria-labelledby");
    if (labelledBy) {
      const text = labelledBy
        .split(/\s+/)
        .map((refId) => document.getElementById(refId)?.textContent ?? "")
        .join(" ")
        .trim();
      if (text) return text.slice(0, 40);
    }

    if (el.id) {
      const bound = document.querySelector('label[for="' + CSS.escape(el.id) + '"]');
      if (bound?.textContent?.trim()) return bound.textContent.trim().slice(0, 40);
    }

    const wrapping = el.closest("label");
    if (wrapping?.textContent?.trim()) return wrapping.textContent.trim().slice(0, 40);

    const title = el.getAttribute("title");
    if (title?.trim()) return title.trim().slice(0, 40);

    return (el.textContent || "").trim().slice(0, 40);
  };

  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;

    if ((r.right > vw + 1 || r.left < -1) && !inScrollRegion(el) && !decorative(el)) {
      issues.push({
        kind: "gorunumu-tasiyor",
        detail:
          el.tagName +
          "." +
          String(el.className).split(" ")[0] +
          " " +
          Math.round(r.left) +
          ".." +
          Math.round(r.right) +
          ' "' +
          (el.textContent || "").trim().slice(0, 24) +
          '"',
      });
    }
  }

  for (const el of document.querySelectorAll('a, button, [role="button"], input, select')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // ::before ile büyütülen hedefler gerçek alanı yansıtmaz, onları atlıyoruz.
    if (visuallyHidden(el)) continue;
    // ::before ile büyütülen hedefler gerçek alanı yansıtmaz, onları atlıyoruz.
    const grown = getComputedStyle(el, "::before").content !== "none";
    if (!grown && (r.width < MIN_TARGET || r.height < MIN_TARGET)) {
      issues.push({
        kind: "kucuk-dokunma-hedefi",
        detail: Math.round(r.width) + "x" + Math.round(r.height) + " " + label(el),
      });
    }
    if (!label(el) && !el.querySelector("img[alt]:not([alt=''])")) {
      issues.push({ kind: "adsiz-kontrol", detail: el.tagName + " " + el.className });
    }
  }

  for (const img of document.querySelectorAll("img")) {
    if (!img.hasAttribute("alt")) issues.push({ kind: "alt-yok", detail: img.src.slice(-40) });
  }

  return JSON.stringify({ issues, height: document.documentElement.scrollHeight });
})()`;

/* --------------------------- CDP istemcisi --------------------------- */

class Cdp {
  #ws;
  #id = 0;
  #pending = new Map();

  static async connect(wsUrl) {
    const client = new Cdp();
    client.#ws = new WebSocket(wsUrl);
    client.#ws.addEventListener("message", (e) => {
      const msg = JSON.parse(e.data);
      const resolve = client.#pending.get(msg.id);
      if (!resolve) return;
      client.#pending.delete(msg.id);
      resolve(msg.error ? Promise.reject(new Error(msg.error.message)) : msg.result);
    });
    await new Promise((res, rej) => {
      client.#ws.addEventListener("open", res, { once: true });
      client.#ws.addEventListener("error", () => rej(new Error("CDP bağlantısı kurulamadı")), {
        once: true,
      });
    });
    return client;
  }

  send(method, params = {}) {
    const id = ++this.#id;
    return new Promise((resolve) => {
      this.#pending.set(id, resolve);
      this.#ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.#ws.close();
  }
}

/* ------------------------------ akış ------------------------------ */

const profile = mkdtempSync(join(tmpdir(), "ui-audit-"));
// Port 0: çekirdek boş bir port verir. Sabit port kullanınca aynı anda çalışan
// iki denetim birbirinin Chrome'unu sürüyordu.
const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "--disable-gpu",
  "--hide-scrollbars",
  "about:blank",
]);

process.on("exit", () => {
  chrome.kill();
  // Chrome çıkışı tamamlamadan dizin silinemeyebilir, kalıntı zararsız.
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  } catch {
    /* geçici dizin sistemde kalır */
  }
});

/** Chrome atanan portu stderr'e yazar, oradan okuyoruz. */
function readDevtoolsPort(timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    let buf = "";
    const timer = setTimeout(
      () => reject(new Error("Chrome DevTools portunu bildirmedi")),
      timeoutMs,
    );
    chrome.stderr.on("data", (chunk) => {
      buf += chunk;
      const m = buf.match(/ws:\/\/127\.0\.0\.1:(\d+)\//);
      if (m) {
        clearTimeout(timer);
        resolve(Number(m[1]));
      }
    });
    chrome.once("error", reject);
  });
}

const port = await readDevtoolsPort();

const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
  method: "PUT",
}).then((r) => r.json());
const cdp = await Cdp.connect(target.webSocketDebuggerUrl);

await cdp.send("Page.enable");

if (AUTH_ROLE) {
  const session = {
    id: AUTH_ROLE === "instructor" ? "seed-instructor" : "seed-student",
    name: AUTH_ROLE === "instructor" ? "Furkan Gündüz" : "Deniz Kaya",
    username: AUTH_ROLE === "instructor" ? "admin" : "demo",
    email: AUTH_ROLE === "instructor" ? "egitmen@unityacademy.dev" : "deniz@ornek.com",
    role: AUTH_ROLE,
    createdAt: "2026-01-06T09:00:00.000Z",
  };
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `try{localStorage.setItem("ua.session",${JSON.stringify(JSON.stringify(session))});}catch(e){}`,
  });
}

mkdirSync(OUT_DIR, { recursive: true });

let failed = 0;

for (const [name, width, height, mobile] of VIEWPORTS) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 2,
    mobile,
  });
  await cdp.send("Page.navigate", { url: URL_ARG });
  // Yükleme, font ve giriş animasyonları için pay.
  await new Promise((r) => setTimeout(r, 2200));

  // Görünüme girince çalışan girişler tetiklensin, yoksa fold altındaki her şey
  // saydam kalır ve ekran görüntüsü boş kutular gösterir.
  await cdp.send("Runtime.evaluate", {
    expression: `(async () => {
      // Yumuşak kaydırma açıkken scrollTo animasyonla ilerliyor ve döngü
      // sayfanın sonuna ulaşmadan bitiyordu. Denetim boyunca kapatıyoruz.
      const root = document.documentElement;
      const prev = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      const step = innerHeight * 0.75;
      for (let y = 0; y < root.scrollHeight; y += step) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 160));
      }
      scrollTo(0, 0);
      root.style.scrollBehavior = prev;
    })()`,
    awaitPromise: true,
  });
  await new Promise((r) => setTimeout(r, 700));

  const { result } = await cdp.send("Runtime.evaluate", {
    // Dokunmalı cihazda platform kuralı 44px. Fare ile kullanılan genişlikte
    // WCAG 2.2 AA eşiği 24px yeterli.
    expression: AUDIT(mobile ? 44 : 24),
    returnByValue: true,
  });
  const { issues, height: pageHeight } = JSON.parse(result.value);

  const shot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height: Math.min(pageHeight, 6000), scale: 1 },
  });
  writeFileSync(join(OUT_DIR, `${name}.png`), Buffer.from(shot.data, "base64"));

  // Aynı tip sorunu tek satırda topla, rapor okunur kalsın.
  const grouped = new Map();
  for (const it of issues) {
    if (!grouped.has(it.kind)) grouped.set(it.kind, []);
    grouped.get(it.kind).push(it.detail);
  }

  console.log(`\n${name}  (${width}x${height})`);
  if (grouped.size === 0) {
    console.log("  temiz");
  } else {
    for (const [kind, details] of grouped) {
      failed += details.length;
      console.log(`  ${kind} (${details.length})`);
      for (const d of details.slice(0, 5)) console.log(`      ${d}`);
      if (details.length > 5) console.log(`      ... ${details.length - 5} tane daha`);
    }
  }
}

cdp.close();
console.log(`\nEkran görüntüleri: ${OUT_DIR}/`);
if (failed > 0) console.error(`${failed} sorun bulundu.`);
else console.log("Tüm kırılım noktaları temiz.");

// Chrome alt süreci açık kaldığı sürece Node event loop'u boşalmıyor ve betik
// işi bittiği hâlde asılı kalıyor. Açıkça kapatıp çıkıyoruz.
chrome.kill();
process.exit(failed > 0 ? 1 : 0);
