"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import type { Choice, Exercise } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type Props = {
  exercise: Extract<Exercise, { kind: "choice" }>;
  locale: Locale;
  onSolved: (attempts: number) => void;
};

/**
 * Tek ya da çok seçimli soru. Yanlış şık seçilince genel bir "yanlış" değil,
 * o şıkkın hedeflediği yanlış anlamayı düzelten metin çıkıyor.
 */
export function ChoiceExercise({ exercise, locale, onSolved }: Props) {
  const t = getDictionary(locale).lesson;
  const reduced = useReducedMotion();

  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const correctSet = exercise.choices
    .map((choice, i) => (choice.correct ? i : -1))
    .filter((i) => i >= 0);

  const isRight =
    picked.length === correctSet.length && correctSet.every((i) => picked.includes(i));
  const solved = checked && isRight;

  function toggle(index: number) {
    if (solved) return;
    setChecked(false);
    setPicked((current) => {
      if (exercise.multi) {
        return current.includes(index)
          ? current.filter((i) => i !== index)
          : [...current, index];
      }
      return [index];
    });
  }

  function check() {
    const next = attempts + 1;
    setAttempts(next);
    setChecked(true);
    if (picked.length === correctSet.length && correctSet.every((i) => picked.includes(i))) {
      onSolved(next);
    }
  }

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{exercise.question[locale]}</p>
      {exercise.multi ? (
        <p className="mt-1.5 text-[13px] text-text-subtle">{t.multiHint}</p>
      ) : null}

      <ul className="mt-5 flex flex-col gap-2.5">
        {exercise.choices.map((choice, i) => (
          <ChoiceRow
            key={choice.text[locale]}
            choice={choice}
            locale={locale}
            picked={picked.includes(i)}
            checked={checked}
            solved={solved}
            reduced={reduced ?? false}
            onPick={() => toggle(i)}
          />
        ))}
      </ul>

      {!solved ? (
        <Button
          size="lg"
          className="mt-6 w-full sm:w-auto"
          disabled={picked.length === 0}
          onClick={check}
        >
          {checked ? t.tryAgain : t.checkAnswer}
        </Button>
      ) : null}
    </div>
  );
}

function ChoiceRow({
  choice,
  locale,
  picked,
  checked,
  solved,
  reduced,
  onPick,
}: {
  choice: Choice;
  locale: Locale;
  picked: boolean;
  checked: boolean;
  solved: boolean;
  reduced: boolean;
  onPick: () => void;
}) {
  // Geri bildirim yalnızca işaretlenen şıkta açılır; cevap listesi
  // kontrol edilmeden dolmuyor.
  const reveal = checked && picked;
  const tone = reveal ? (choice.correct ? "correct" : "wrong") : "idle";

  return (
    <li>
      <button
        type="button"
        onClick={onPick}
        disabled={solved}
        aria-pressed={picked}
        className={cn(
          "flex w-full items-start gap-3 rounded-2xl p-4 text-left ring-1 transition-colors duration-(--dur-fast)",
          tone === "idle" && picked && "bg-accent-soft ring-accent",
          tone === "idle" && !picked && "bg-surface ring-border hover:ring-border-strong",
          tone === "correct" && "bg-success-surface ring-success",
          tone === "wrong" && "bg-danger-surface ring-danger",
          !solved && "cursor-pointer",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ring-2 transition-colors duration-(--dur-fast)",
            tone === "correct" && "bg-success text-white ring-success",
            tone === "wrong" && "bg-danger text-white ring-danger",
            tone === "idle" && picked && "bg-accent text-on-accent ring-accent",
            tone === "idle" && !picked && "ring-border-strong",
          )}
        >
          {tone === "correct" ? (
            <Check className="size-3.5" strokeWidth={3.5} />
          ) : tone === "wrong" ? (
            <X className="size-3.5" strokeWidth={3.5} />
          ) : picked ? (
            <Check className="size-3.5" strokeWidth={3.5} />
          ) : null}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[15px]/[1.55] text-text">{choice.text[locale]}</span>
          {reveal ? (
            <m.span
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 block overflow-hidden text-[13.5px]/[1.6] text-text-muted"
            >
              {choice.feedback[locale]}
            </m.span>
          ) : null}
        </span>
      </button>
    </li>
  );
}
