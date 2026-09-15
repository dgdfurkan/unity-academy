"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Exercise } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type Props = {
  exercise: Extract<Exercise, { kind: "order" }>;
  locale: Locale;
  onSolved: (attempts: number) => void;
};

/**
 * Sıraya dizme. Sürükleme yerine yukarı ve aşağı düğmeleri var: dokunmatikte
 * sayfa kaydırmasıyla çakışmıyor ve klavyeyle de kullanılabiliyor.
 */
export function OrderExercise({ exercise, locale, onSolved }: Props) {
  const t = getDictionary(locale).lesson;

  const shuffled = useMemo(() => {
    const indexes = exercise.items.map((_, i) => i);
    return indexes.sort((a, b) => ((a * 7919) % indexes.length) - ((b * 7919) % indexes.length));
  }, [exercise.items]);

  const [order, setOrder] = useState<number[]>(shuffled);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const correct = order.every((value, i) => value === i);
  const solved = checked && correct;

  function move(from: number, to: number) {
    if (solved || to < 0 || to >= order.length) return;
    setChecked(false);
    setOrder((current) => {
      const next = [...current];
      const moved = next[from];
      const target = next[to];
      if (moved === undefined || target === undefined) return current;
      next[from] = target;
      next[to] = moved;
      return next;
    });
  }

  function check() {
    const next = attempts + 1;
    setAttempts(next);
    setChecked(true);
    if (order.every((value, i) => value === i)) onSolved(next);
  }

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{exercise.question[locale]}</p>
      <p className="mt-1.5 text-[13px] text-text-subtle">{t.orderHint}</p>

      <ol className="mt-5 flex flex-col gap-2.5">
        {order.map((itemIndex, position) => {
          const item = exercise.items[itemIndex];
          if (!item) return null;
          const isRight = checked && itemIndex === position;
          const isWrong = checked && itemIndex !== position;
          return (
            <li
              key={item[locale]}
              className={cn(
                "flex items-center gap-3 rounded-2xl p-3 ring-1 transition-colors duration-(--dur-fast)",
                isRight && "bg-success-surface ring-success",
                isWrong && "bg-danger-surface ring-danger",
                !checked && "bg-surface ring-border",
              )}
            >
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 font-mono text-[13px] font-semibold text-text-subtle"
              >
                {position + 1}
              </span>
              <span className="min-w-0 flex-1 text-[14.5px]/[1.5] text-text">{item[locale]}</span>
              <span className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => move(position, position - 1)}
                  disabled={position === 0 || solved}
                  aria-label={t.moveUp}
                  className="grid size-11 cursor-pointer place-items-center rounded-full text-text-subtle transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-text disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowUp className="size-4" strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={() => move(position, position + 1)}
                  disabled={position === order.length - 1 || solved}
                  aria-label={t.moveDown}
                  className="grid size-11 cursor-pointer place-items-center rounded-full text-text-subtle transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-text disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowDown className="size-4" strokeWidth={2.2} />
                </button>
              </span>
            </li>
          );
        })}
      </ol>

      {solved ? (
        <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-success-surface px-4 py-3 text-[13.5px]/[1.6] text-text">
          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
          {exercise.feedback[locale]}
        </p>
      ) : (
        <Button size="lg" className="mt-6" onClick={check}>
          {checked ? t.tryAgain : t.checkAnswer}
        </Button>
      )}
    </div>
  );
}
