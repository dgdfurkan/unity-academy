import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";

/**
 * Söz dizimi rengi anlamsal token'lar üzerinden gelir, ayrı bir palet açılmaz.
 * Renklendirme elle yapılıyor: statik tek bir parça için Prism ya da Shiki
 * yüklemek paketi boşuna 40KB şişirirdi.
 */
const COLOR = {
  kw: "text-accent-text",
  type: "text-info",
  attr: "text-warning",
  num: "text-warning",
  cmt: "text-text-subtle",
  id: "text-text",
  p: "text-text-muted",
} as const;

type Tok = [keyof typeof COLOR, string];

/**
 * Satırlar 59 karakteri geçmez. Hero'daki panel genişliğinde yatay kaydırma
 * gerektirmeden sığan sınır bu.
 */
const LINES: Tok[][] = [
  [["kw", "public class"], ["p", " "], ["type", "Runner"], ["p", " : "], ["type", "MonoBehaviour"]],
  [["p", "{"]],
  [
    ["p", "    "],
    ["attr", "[SerializeField]"],
    ["p", " "],
    ["kw", "private float"],
    ["p", " "],
    ["id", "speed"],
    ["p", " = "],
    ["num", "8f"],
    ["p", ";"],
  ],
  [["p", "    "], ["kw", "private"], ["p", " "], ["type", "Rigidbody"], ["p", " "], ["id", "body"], ["p", ";"]],
  [],
  [["p", "    "], ["kw", "private void"], ["p", " "], ["id", "Awake"], ["p", "()"]],
  [["p", "    {"]],
  [
    ["p", "        "],
    ["id", "body"],
    ["p", " = "],
    ["id", "GetComponent"],
    ["p", "<"],
    ["type", "Rigidbody"],
    ["p", ">();"],
  ],
  [["p", "    }"]],
  [],
  [["p", "    "], ["cmt", "// Physics moves in FixedUpdate, not Update."]],
  [["p", "    "], ["kw", "private void"], ["p", " "], ["id", "FixedUpdate"], ["p", "()"]],
  [["p", "    {"]],
  [
    ["p", "        "],
    ["kw", "float"],
    ["p", " "],
    ["id", "distance"],
    ["p", " = "],
    ["id", "speed"],
    ["p", " * "],
    ["type", "Time"],
    ["p", "."],
    ["id", "fixedDeltaTime"],
    ["p", ";"],
  ],
  [
    ["p", "        "],
    ["type", "Vector3"],
    ["p", " "],
    ["id", "offset"],
    ["p", " = "],
    ["type", "Vector3"],
    ["p", "."],
    ["id", "forward"],
    ["p", " * "],
    ["id", "distance"],
    ["p", ";"],
  ],
  [
    ["p", "        "],
    ["id", "body"],
    ["p", "."],
    ["id", "MovePosition"],
    ["p", "("],
    ["id", "body"],
    ["p", "."],
    ["id", "position"],
    ["p", " + "],
    ["id", "offset"],
    ["p", ");"],
  ],
  [["p", "    }"]],
  [["p", "}"]],
];

/**
 * Satır başına yazılma süresi ve gecikmesi. Boş satır yazılmaz, sadece kısa bir
 * duraklama olur. Toplam yaklaşık 1,9 saniye: hero'yu bekletmeyecek kadar kısa,
 * gözün takip edebileceği kadar uzun.
 */
const CHAR_MS = 7;
const BLANK_LINE_MS = 90;
const START_DELAY_MS = 280;

const TIMING = LINES.reduce<{ delay: number; duration: number }[]>((acc, line) => {
  const chars = line.reduce((n, [, text]) => n + text.length, 0);
  const previous = acc[acc.length - 1];
  const delay = previous ? previous.delay + previous.duration : START_DELAY_MS;
  return [...acc, { delay, duration: chars > 0 ? chars * CHAR_MS : BLANK_LINE_MS }];
}, []);

const TYPING_TOTAL_MS = (() => {
  const last = TIMING[TIMING.length - 1];
  return last ? last.delay + last.duration : START_DELAY_MS;
})();

/** Ürünün ne yaptığını anlatan görsel: gerçek bir script ve ona dönen kontrol sonucu. */
export function CodePanel({ check }: { check: Dictionary["check"] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </div>
        <span className="ml-1.5 font-mono text-xs text-text-muted">Runner.cs</span>
      </div>

      <pre className="overflow-x-auto p-5 font-mono text-[12px]/[1.75] sm:text-[13px]/[1.8]">
        <code>
          {LINES.map((line, i) => {
            const chars = line.reduce((n, [, text]) => n + text.length, 0);
            const timing = TIMING[i] ?? { delay: START_DELAY_MS, duration: 0 };
            return (
              <span key={i} className="relative">
                <span
                  className="code-line"
                  style={
                    {
                      "--type-chars": Math.max(chars, 1),
                      "--type-dur": `${timing.duration}ms`,
                      "--type-delay": `${timing.delay}ms`,
                    } as CSSProperties
                  }
                >
                  {line.map(([kind, text], j) => (
                    <span key={j} className={COLOR[kind]}>
                      {text}
                    </span>
                  ))}
                </span>
                {chars > 0 ? (
                  <span
                    aria-hidden="true"
                    className="code-caret"
                    style={
                      {
                        "--type-chars": chars,
                        "--type-dur": `${timing.duration}ms`,
                        "--type-delay": `${timing.delay}ms`,
                      } as CSSProperties
                    }
                  />
                ) : null}
                {i < LINES.length - 1 ? "\n" : null}
              </span>
            );
          })}
        </code>
      </pre>

      {/* Kontrol sonucu, kod yazılıp bittikten sonra görünür. Asıl anlatılan şey bu:
          kodu yazarsın, kontrol edilir, sonuç döner. */}
      <div
        className="reveal-after-typing flex items-start gap-2.5 border-t border-border bg-success-surface px-5 py-3.5"
        style={{ "--type-delay": `${TYPING_TOTAL_MS + 120}ms` } as CSSProperties}
      >
        <Check className="mt-px size-4 shrink-0 text-success" strokeWidth={2.5} aria-hidden="true" />
        {/* FixedUpdate ve fixedDeltaTime kod tarafındaki isimler, hiçbir dilde çevrilmez.
            Cümlenin içinden ayıklanıp mono yazı tipiyle gösteriliyorlar. */}
        <p className="text-[13px]/[1.6] text-text">
          <span className="font-semibold text-success">{check.passed}</span>{" "}
          {check.body.split(/(FixedUpdate|fixedDeltaTime)/).map((part, i) =>
            part === "FixedUpdate" || part === "fixedDeltaTime" ? (
              <code key={i} className="font-mono text-text-muted">
                {part}
              </code>
            ) : (
              part
            ),
          )}
        </p>
      </div>
    </div>
  );
}
