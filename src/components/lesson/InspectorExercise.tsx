"use client";

import { useState } from "react";
import { Check, Play, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Exercise } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type Props = {
  exercise: Extract<Exercise, { kind: "inspector" }>;
  locale: Locale;
  onSolved: (attempts: number) => void;
};

/**
 * Unity Inspector'ının çalışan bir taklidi. `[SerializeField]` ve serileştirme,
 * anlatılarak değil elle denenerek öğreniliyor: değeri değiştir, Play'e bas,
 * kodun ne yazdığını gör.
 */
export function InspectorExercise({ exercise, locale, onSolved }: Props) {
  const t = getDictionary(locale).lesson;

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(exercise.fields.map((f) => [f.name, f.value])),
  );
  const [output, setOutput] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);

  function run() {
    const next = attempts + 1;
    setAttempts(next);

    const current = values[exercise.target.name] ?? "";
    setOutput(
      exercise.fields
        .map((f) => `${f.name} = ${values[f.name] ?? f.value}`)
        .join("\n"),
    );

    if (current.trim() === exercise.target.value && !solved) {
      setSolved(true);
      onSolved(next);
    }
  }

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{exercise.question[locale]}</p>
      <p className="mt-1.5 text-[13px] text-text-subtle">{t.inspectorHint}</p>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Kod tarafı */}
        <figure className="overflow-hidden rounded-2xl bg-ink">
          <figcaption className="border-b border-ink-border px-4 py-2.5 font-mono text-[12px] uppercase tracking-wide text-on-ink-muted">
            {t.inspectorCode}
          </figcaption>
          <pre className="overflow-x-auto p-4 font-mono text-[12.5px]/[1.8] text-on-ink">
            <code>{exercise.code}</code>
          </pre>
        </figure>

        {/* Inspector tarafı */}
        <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
          <p className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-text-subtle">
            <Settings2 className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
            {t.inspectorPanel}
          </p>
          <div className="flex flex-col gap-3 p-4">
            {exercise.fields.map((field) => (
              <label key={field.name} className="flex items-center justify-between gap-3">
                <span className="font-mono text-[13px] text-text">{field.name}</span>
                {field.type === "bool" ? (
                  <input
                    type="checkbox"
                    checked={values[field.name] === "true"}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [field.name]: e.target.checked ? "true" : "false" }))
                    }
                    className="size-6 shrink-0 accent-[var(--accent)]"
                  />
                ) : (
                  <input
                    type="text"
                    inputMode="decimal"
                    value={values[field.name] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                    className="h-11 w-28 rounded-xl bg-surface-2 px-3 text-right font-mono text-[13px] text-text ring-1 ring-border-strong transition-colors duration-(--dur-instant) focus:ring-accent"
                  />
                )}
              </label>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <Button onClick={run} className="w-full">
              <Play className="size-4" strokeWidth={2.4} aria-hidden="true" />
              {t.inspectorApply}
            </Button>
          </div>
        </div>
      </div>

      {output ? (
        <pre
          className={cn(
            "mt-4 overflow-x-auto rounded-2xl px-4 py-3 font-mono text-[12.5px]/[1.8]",
            solved ? "bg-success-surface text-text" : "bg-surface-2 text-text-muted",
          )}
        >
          <code>{output}</code>
        </pre>
      ) : null}

      {solved ? (
        <p className="mt-3 flex items-start gap-2.5 rounded-2xl bg-success-surface px-4 py-3 text-[13.5px]/[1.6] text-text">
          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
          {exercise.feedback[locale]}
        </p>
      ) : null}
    </div>
  );
}
