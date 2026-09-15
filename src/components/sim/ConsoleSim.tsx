"use client";

import { useState } from "react";
import { Check, CircleAlert, Info, TriangleAlert } from "lucide-react";
import { SimFrame, SimResult } from "@/components/sim/SimFrame";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type Entry = {
  tone: "log" | "warning" | "error";
  message: { tr: string; en: string };
  file: string;
  line: number;
  explain: { tr: string; en: string };
};

const ENTRIES: Entry[] = [
  {
    tone: "log",
    message: { tr: "Oyun başladı", en: "Game started" },
    file: "GameManager.cs",
    line: 18,
    explain: {
      tr: "Bu senin yazdığın bir Debug.Log. Bilgi verir, bir sorun anlatmaz.",
      en: "This is a Debug.Log you wrote. It informs; it does not report a problem.",
    },
  },
  {
    tone: "warning",
    message: { tr: "Kullanılmayan değişken: temp", en: "Unused variable: temp" },
    file: "PlayerMove.cs",
    line: 9,
    explain: {
      tr: "Uyarı oyunu durdurmaz ama bir şeyin unutulduğunu söyler. Bu satırda tanımlanan temp hiç kullanılmamış.",
      en: "A warning does not stop the game but tells you something was left behind. The temp declared here is never used.",
    },
  },
  {
    tone: "error",
    message: {
      tr: "NullReferenceException: Object reference not set to an instance of an object",
      en: "NullReferenceException: Object reference not set to an instance of an object",
    },
    file: "PlayerMove.cs",
    line: 23,
    explain: {
      tr: "Kırmızı satır bir şeyin çalışmadığını söyler. 23. satırda boş bir referans kullanılmış: muhtemelen Inspector'da atanmamış bir alan. Satıra çift tıklamak kod editörünü tam orada açar.",
      en: "A red line means something did not run. Line 23 used an empty reference, most likely a field left unassigned in the Inspector. Double-clicking the line opens your editor right there.",
    },
  },
];

const CODE = [
  "private void Update()",
  "{",
  "    float step = speed * Time.deltaTime;",
  "    target.position += Vector3.forward * step;",
  "}",
];

const COPY = {
  tr: {
    label: "Console",
    start: "Satırlardan birine dokun. Kırmızı olanla sarı olanın farkına bak.",
    codeLabel: "PlayerMove.cs",
    done: "Üç satırı da okudun. Log bilgi verir, Warning uyarır, Error çalışmadığını söyler.",
  },
  en: {
    label: "Console",
    start: "Tap one of the lines. Notice the difference between the red one and the yellow one.",
    codeLabel: "PlayerMove.cs",
    done: "You read all three. Log informs, Warning cautions, Error says it did not run.",
  },
} as const;

const TONE = {
  log: { icon: Info, className: "text-text-subtle" },
  warning: { icon: TriangleAlert, className: "text-warning" },
  error: { icon: CircleAlert, className: "text-danger" },
} as const;

/** Console satırlarını okumayı ve hatadan koda atlamayı denetiyor. */
export function ConsoleSim({ locale, onSolved }: { locale: Locale; onSolved?: () => void }) {
  const t = COPY[locale];
  const [active, setActive] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  function pick(index: number) {
    setActive(index);
    const next = new Set(seen);
    next.add(index);
    setSeen(next);
    if (next.size === ENTRIES.length) onSolved?.();
  }

  const entry = active === null ? null : ENTRIES[active];

  return (
    <div className="flex flex-col gap-3">
      <SimFrame label={t.label}>
        <ul className="divide-y divide-border">
          {ENTRIES.map((item, i) => {
            const { icon: Icon, className } = TONE[item.tone];
            return (
              <li key={item.message.en}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  className={cn(
                    "flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left transition-colors duration-(--dur-instant)",
                    active === i ? "bg-accent-soft" : "hover:bg-surface-2",
                  )}
                >
                  <Icon className={cn("mt-0.5 size-4 shrink-0", className)} strokeWidth={2.2} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px]/[1.5] text-text">{item.message[locale]}</span>
                    <span className="mt-0.5 block font-mono text-[12px] text-text-subtle">
                      {item.file}:{item.line}
                    </span>
                  </span>
                  {seen.has(i) ? (
                    <Check className="mt-0.5 size-3.5 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Seçilen hatanın satırı kodda işaretlenir. */}
        {entry ? (
          <div className="border-t border-border bg-ink">
            <p className="border-b border-ink-border px-4 py-2 font-mono text-[11.5px] uppercase tracking-wide text-on-ink-muted">
              {t.codeLabel}
            </p>
            <ol className="py-2 font-mono text-[12.5px]/[1.9]">
              {CODE.map((line, i) => {
                const lineNumber = entry.line - 2 + i;
                const isTarget = lineNumber === entry.line;
                return (
                  <li
                    key={line}
                    className={cn(
                      "flex gap-3 px-4",
                      isTarget && entry.tone === "error" && "bg-danger/20",
                      isTarget && entry.tone === "warning" && "bg-warning/20",
                    )}
                  >
                    <span className="w-6 shrink-0 select-none text-right text-on-ink-muted">
                      {lineNumber}
                    </span>
                    <span className="whitespace-pre text-on-ink">{line}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : null}
      </SimFrame>

      <SimResult tone={entry ? "good" : "info"}>{entry ? entry.explain[locale] : t.start}</SimResult>

      {seen.size === ENTRIES.length ? (
        <SimResult tone="good">
          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
          {t.done}
        </SimResult>
      ) : null}
    </div>
  );
}
