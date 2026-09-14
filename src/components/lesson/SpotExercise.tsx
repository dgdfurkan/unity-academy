"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import type { Exercise } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type Props = {
  exercise: Extract<Exercise, { kind: "spot" }>;
  locale: Locale;
  onSolved: (attempts: number) => void;
};

/** Hatalı satırı bul. Kod okuma alışkanlığı kazandırır. */
export function SpotExercise({ exercise, locale, onSolved }: Props) {
  const t = getDictionary(locale).lesson;
  const [picked, setPicked] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);

  const solved = picked === exercise.correctLine;

  function pick(index: number) {
    if (solved) return;
    const next = attempts + 1;
    setAttempts(next);
    setPicked(index);
    if (index === exercise.correctLine) onSolved(next);
  }

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{exercise.question[locale]}</p>
      <p className="mt-1.5 text-[13px] text-text-subtle">{t.spotHint}</p>

      <ol className="mt-5 overflow-hidden rounded-2xl bg-ink font-mono text-[13px]/[1.9]">
        {exercise.lines.map((line, i) => {
          const isPicked = picked === i;
          const isAnswer = i === exercise.correctLine;
          return (
            <li key={`${i}-${line}`}>
              <button
                type="button"
                onClick={() => pick(i)}
                disabled={solved}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-1.5 text-left transition-colors duration-(--dur-instant)",
                  !solved && "cursor-pointer hover:bg-white/[0.06]",
                  isPicked && isAnswer && "bg-success/20",
                  isPicked && !isAnswer && "bg-danger/20",
                )}
              >
                <span className="w-5 shrink-0 select-none text-right text-on-ink-muted">{i + 1}</span>
                <span className="min-w-0 flex-1 whitespace-pre text-on-ink">{line}</span>
                {isPicked ? (
                  <span aria-hidden="true" className="shrink-0">
                    {isAnswer ? (
                      <Check className="size-4 text-success" strokeWidth={3} />
                    ) : (
                      <X className="size-4 text-danger" strokeWidth={3} />
                    )}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      {picked !== null ? (
        <p
          className={cn(
            "mt-4 rounded-2xl px-4 py-3 text-[13.5px]/[1.6]",
            solved ? "bg-success-surface text-text" : "bg-danger-surface text-text",
          )}
        >
          {solved ? exercise.feedback[locale] : t.tryAgain}
        </p>
      ) : null}
    </div>
  );
}
