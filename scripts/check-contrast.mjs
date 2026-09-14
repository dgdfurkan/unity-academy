/**
 * Palet kontrast denetimi.
 * Token değerlerini src/app/globals.css içinden okur, WCAG 2.2 oranlarını hesaplar
 * ve eşiği geçmeyen çiftte hata verir.
 *
 *   node scripts/check-contrast.mjs
 */
import { readFileSync } from "node:fs";

const CSS = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

/** Bir tema bloğundaki --token: #hex çiftlerini çıkarır. */
function readTheme(selector) {
  const escaped = selector.replace(/[[\]"=]/g, (c) => `\\${c}`);
  const block = CSS.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`));
  if (!block) throw new Error(`Tema bloğu bulunamadı: ${selector}`);
  const tokens = {};
  for (const [, name, hex] of block[1].matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    tokens[name] = hex;
  }
  return tokens;
}

function luminance(hex) {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** [ön plan, zemin, eşik, açıklama] */
const PAIRS = [
  ["text", "bg", 4.5, "gövde metni sayfa zemininde"],
  ["text", "surface", 4.5, "gövde metni kartta"],
  ["text-muted", "bg", 4.5, "ikincil metin"],
  ["text-subtle", "bg", 4.5, "silik metin"],
  ["text-muted", "surface-2", 4.5, "ikincil metin yükseltilmiş yüzeyde"],
  ["on-accent", "accent", 4.5, "buton etiketi"],
  ["accent-text", "bg", 4.5, "vurgu rengi metin"],
  ["accent-text", "surface", 4.5, "vurgu rengi metin kartta"],
  ["success", "bg", 4.5, "başarı metni"],
  ["warning", "bg", 4.5, "uyarı metni"],
  ["danger", "bg", 4.5, "hata metni"],
  ["info", "bg", 4.5, "bilgi metni"],
  ["accent", "bg", 3.0, "dolu buton yüzeyi"],
  ["ring", "bg", 3.0, "odak halkası"],
  ["border-strong", "surface", 3.0, "girdi kenarlığı"],
];

let failed = 0;

for (const selector of [":root,\n[data-theme=\"dark\"]", '[data-theme="light"]']) {
  const label = selector.includes("light") ? "AÇIK TEMA" : "KOYU TEMA";
  const t = readTheme(selector);
  console.log(`\n${label}`);

  for (const [fg, bg, min, note] of PAIRS) {
    if (!t[fg] || !t[bg]) {
      console.log(`  ?  --${fg} / --${bg}  (token yok)`);
      failed++;
      continue;
    }
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    if (!ok) failed++;
    console.log(
      `  ${ok ? "ok" : "HATA"}  ${r.toFixed(2).padStart(5)}:1  (>=${min})  --${fg} / --${bg}  ${note}`,
    );
  }
}

if (failed > 0) {
  console.error(`\n${failed} çift eşiği geçmedi.`);
  process.exit(1);
}
console.log("\nTüm çiftler eşiği geçti.");
