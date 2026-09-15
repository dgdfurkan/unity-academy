"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Exercise } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type Props = {
  exercise: Extract<Exercise, { kind: "fill" }>;
  locale: Locale;
  onSolved: (attempts: number) => void;
};

/**
 * Boşluk doldurma. Klavyeden yazdırmak yerine havuzdan seçtiriyoruz: amaç
 * söz dizimini tanımak, yazım hatasıyla uğraşmak değil.
 */
export function FillExercise({ exercise, locale, onSolved }: Props) {
  const t = getDictionary(locale).lesson;
  const parts = useMemo(() => exercise.template.split("___"), [exercise.template]);

  const pool = useMemo(() => {
    const all = [...exercise.answers, ...exercise.distractors];
    // Deterministik karıştırma: her açılışta aynı sıra, ama cevap sırası değil.
    return all
      .map((token, i) => ({ token, key: (i * 7919) % all.length }))
      .sort((a, b) => a.key - b.key)
      .map((x) => x.token);
  }, [exercise.answers, exercise.distractors]);

  const [filled, setFilled] = useState<(string | null)[]>(() =>
    exercise.answers.map(() => null),
  );
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const solved = checked && filled.every((value, i) => value === exercise.answers[i]);
  const complete = filled.every((value) => value !== null);

  function place(token: string) {
    if (solved) return;
    const slot = filled.findIndex((value) => value === null);
    if (slot === -1) return;
    setChecked(false);
    setFilled((current) => current.map((value, i) => (i === slot ? token : value)));
  }

  function clearSlot(index: number) {
    if (solved) return;
    setChecked(false);
    setFilled((current) => current.map((value, i) => (i === index ? null : value)));
  }

  function check() {
    const next = attempts + 1;
    setAttempts(next);
    setChecked(true);
    if (filled.every((value, i) => value === exercise.answers[i])) onSolved(next);
  }

  const usedCounts = filled.reduce<Record<string, number>>((acc, value) => {
    if (value) acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{exercise.question[locale]}</p>

      <pre className="mt-5 overflow-x-auto rounded-2xl bg-ink p-4 font-mono text-[13px]/[2] text-on-ink">
        <code>
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < filled.length ? (
                <button
                  type="button"
                  onClick={() => clearSlot(i)}
                  disabled={solved}
                  className={cn(
                    "mx-0.5 inline-flex min-w-[5.5rem] items-center justify-center rounded-md px-2 py-0.5 align-middle",
                    "transition-colors duration-(--dur-instant)",
                    filled[i] === null && "bg-white/10 text-on-ink-muted",
                    filled[i] !== null &&
                      !checked &&
                      "cursor-pointer bg-accent/70 text-white hover:bg-accent",
                    checked &&
                      filled[i] === exercise.answers[i] &&
                      "bg-success/80 text-white",
                    checked &&
                      filled[i] !== null &&
                      filled[i] !== exercise.answers[i] &&
                      "cursor-pointer bg-danger/80 text-white",
                  )}
                >
                  {filled[i] ?? " "}
                </button>
              ) : null}
            </span>
          ))}
        </code>
      </pre>

      <ul className="mt-4 flex flex-wrap gap-2">
        {pool.map((token, i) => {
          const answerCount = exercise.answers.filter((a) => a === token).length;
          const exhausted = (usedCounts[token] ?? 0) >= Math.max(answerCount, 1);
          return (
            <li key={`${token}-${i}`}>
              <button
                type="button"
                onClick={() => place(token)}
                disabled={solved || exhausted || complete}
                className={cn(
                  "h-11 rounded-full px-4 font-mono text-[13px] ring-1 transition-colors duration-(--dur-instant)",
                  exhausted || complete || solved
                    ? "bg-surface-2 text-text-subtle ring-border"
                    : "cursor-pointer bg-surface text-text ring-border hover:bg-accent-soft hover:ring-accent",
                )}
              >
                {token}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {!solved ? (
          <>
            <Button size="lg" disabled={!complete} onClick={check}>
              {checked ? t.tryAgain : t.checkAnswer}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => {
                setFilled(exercise.answers.map(() => null));
                setChecked(false);
              }}
            >
              <RotateCcw className="size-4" strokeWidth={2} aria-hidden="true" />
              {t.reset}
            </Button>
          </>
        ) : (
          <p className="flex items-start gap-2.5 rounded-2xl bg-success-surface px-4 py-3 text-[13.5px]/[1.6] text-text">
            <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
            {exercise.feedback[locale]}
          </p>
        )}
      </div>
    </div>
  );
}
