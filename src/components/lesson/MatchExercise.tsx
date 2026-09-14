"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import type { Exercise } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type Props = {
  exercise: Extract<Exercise, { kind: "match" }>;
  locale: Locale;
  onSolved: (attempts: number) => void;
};

/**
 * Eşleştirme. Sürükleme yok: soldan bir öğeye, sonra karşılığına dokunulur.
 * Sürükleme dokunmatikte kaydırmayla çakışıyor ve klavyeyle kullanılamıyor.
 */
export function MatchExercise({ exercise, locale, onSolved }: Props) {
  const t = getDictionary(locale).lesson;

  // Sağ sütun karışık gelir, yoksa eşleştirme sıra ezberine dönüyor.
  const rightOrder = useMemo(() => {
    const indexes = exercise.pairs.map((_, i) => i);
    // Deterministik karıştırma: her açılışta aynı sıra, ama düz sıra değil.
    return indexes.sort((a, b) => {
      const ka = (a * 7919) % exercise.pairs.length;
      const kb = (b * 7919) % exercise.pairs.length;
      return ka - kb;
    });
  }, [exercise.pairs]);

  const [activeLeft, setActiveLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Record<number, number>>({});
  const [wrongPair, setWrongPair] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);

  const done = Object.keys(matched).length === exercise.pairs.length;

  function pickRight(rightIndex: number) {
    if (activeLeft === null || done) return;

    const next = attempts + 1;
    setAttempts(next);

    // Sağdaki metin, seçili soldakinin karşılığıyla aynı mı?
    const expected = exercise.pairs[activeLeft]?.right[locale];
    const actual = exercise.pairs[rightIndex]?.right[locale];

    if (expected && expected === actual) {
      const updated = { ...matched, [activeLeft]: rightIndex };
      setMatched(updated);
      setActiveLeft(null);
      setWrongPair(null);
      if (Object.keys(updated).length === exercise.pairs.length) onSolved(next);
    } else {
      setWrongPair(rightIndex);
      window.setTimeout(() => setWrongPair(null), 600);
    }
  }

  const usedRight = new Set(Object.values(matched));

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{exercise.question[locale]}</p>
      <p className="mt-1.5 text-[13px] text-text-subtle">{t.matchHint}</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <ul className="flex flex-col gap-2.5">
          {exercise.pairs.map((pair, i) => {
            const isMatched = i in matched;
            return (
              <li key={pair.left[locale]}>
                <button
                  type="button"
                  disabled={isMatched}
                  onClick={() => setActiveLeft(i)}
                  aria-pressed={activeLeft === i}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-2xl p-3.5 text-left text-[14px]/[1.45] ring-1",
                    "transition-colors duration-(--dur-fast)",
                    isMatched
                      ? "bg-success-surface text-text ring-success"
                      : activeLeft === i
                        ? "cursor-pointer bg-accent-soft text-text ring-accent"
                        : "cursor-pointer bg-surface text-text ring-border hover:ring-border-strong",
                  )}
                >
                  {isMatched ? (
                    <Check className="size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
                  ) : null}
                  <span className="min-w-0">{pair.left[locale]}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <ul className="flex flex-col gap-2.5">
          {rightOrder.map((rightIndex) => {
            const pair = exercise.pairs[rightIndex];
            if (!pair) return null;
            const isUsed = usedRight.has(rightIndex);
            return (
              <li key={`${pair.right[locale]}-${rightIndex}`}>
                <button
                  type="button"
                  disabled={isUsed || activeLeft === null}
                  onClick={() => pickRight(rightIndex)}
                  className={cn(
                    "w-full rounded-2xl p-3.5 text-left text-[14px]/[1.45] ring-1",
                    "transition-[background-color,box-shadow,transform] duration-(--dur-fast)",
                    isUsed
                      ? "bg-success-surface text-text ring-success"
                      : wrongPair === rightIndex
                        ? "animate-shake bg-danger-surface text-text ring-danger"
                        : activeLeft === null
                          ? "bg-surface/60 text-text-subtle ring-border"
                          : "cursor-pointer bg-surface text-text ring-border hover:ring-border-strong",
                  )}
                >
                  {pair.right[locale]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
