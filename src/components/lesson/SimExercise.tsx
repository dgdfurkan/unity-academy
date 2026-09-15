"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Sim } from "@/components/sim";
import type { Exercise } from "@/content/types";
import type { Locale } from "@/i18n";

type Props = {
  exercise: Extract<Exercise, { kind: "sim" }>;
  locale: Locale;
  onSolved: (attempts: number) => void;
};

/**
 * Simülasyonu bir alıştırma olarak çalıştırır. Çözüm koşulunu simülasyonun
 * kendisi belirler: öğrenci anlatılan şeyi bizzat yaptığında geçer.
 */
export function SimExercise({ exercise, locale, onSolved }: Props) {
  const [solved, setSolved] = useState(false);

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{exercise.question[locale]}</p>

      <div className="mt-5">
        <Sim
          variant={exercise.variant}
          locale={locale}
          onSolved={() => {
            if (solved) return;
            setSolved(true);
            onSolved(1);
          }}
        />
      </div>

      {solved ? (
        <p className="mt-4 flex items-start gap-2.5 rounded-2xl bg-accent-soft px-4 py-3 text-[14px]/[1.6] font-medium text-accent-text">
          <Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} aria-hidden="true" />
          {exercise.feedback[locale]}
        </p>
      ) : null}
    </div>
  );
}
