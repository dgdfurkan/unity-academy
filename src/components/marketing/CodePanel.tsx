import { Check } from "lucide-react";
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
          {LINES.map((line, i) => (
            <span key={i}>
              {line.map(([kind, text], j) => (
                <span key={j} className={COLOR[kind]}>
                  {text}
                </span>
              ))}
              {i < LINES.length - 1 ? "\n" : null}
            </span>
          ))}
        </code>
      </pre>

      <div className="flex items-start gap-2.5 border-t border-border bg-success-surface px-5 py-3.5">
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
