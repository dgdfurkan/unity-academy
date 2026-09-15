"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Play, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Exercise } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type Props = {
  exercise: Extract<Exercise, { kind: "code" }>;
  locale: Locale;
  onSolved: (attempts: number) => void;
};

/** Yorumlar ve boşluklar sadeleştirilir; kontrol biçimden değil içerikten geçsin. */
function normalize(code: string): string {
  return code
    .replace(/\/\/[^\n]*/g, " ")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Kod yazma alıştırması.
 *
 * Tarayıcıda gerçek bir C# derleyicisi çalıştırmıyoruz. Kontrol, dersin
 * öğrettiği özelliklerin kodda olup olmadığına bakıyor: FixedUpdate kullanılmış
 * mı, Time.deltaTime ile çarpılmış mı, alan private mı. Bu, öğrenciye genel bir
 * "yanlış" yerine hangi kuralı atladığını söylüyor. Bu sınır ekranda da yazılı.
 */
export function CodeExercise({ exercise, locale, onSolved }: Props) {
  const t = getDictionary(locale).lesson;
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const [code, setCode] = useState(exercise.starter);
  const [results, setResults] = useState<{ ok: boolean; message: string }[] | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);

  const lineCount = useMemo(() => code.split("\n").length, [code]);

  function run() {
    const next = attempts + 1;
    setAttempts(next);

    const normalized = normalize(code);
    const outcome = exercise.checks.map((check) => {
      const found = new RegExp(check.pattern, check.flags ?? "").test(normalized);
      return { ok: found === check.expect, message: check.message[locale] };
    });

    setResults(outcome);
    if (outcome.every((r) => r.ok) && !solved) {
      setSolved(true);
      onSolved(next);
    }
  }

  /** Tab tuşu odağı kaçırmasın; kod yazarken girinti gerekiyor. */
  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const area = areaRef.current;
    if (!area) return;
    const { selectionStart, selectionEnd } = area;
    const next = `${code.slice(0, selectionStart)}    ${code.slice(selectionEnd)}`;
    setCode(next);
    requestAnimationFrame(() => {
      area.selectionStart = area.selectionEnd = selectionStart + 4;
    });
  }

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{exercise.question[locale]}</p>
      <p className="mt-1.5 text-[13px] text-text-subtle">{t.codeHint}</p>

      <div className="mt-5 overflow-hidden rounded-2xl bg-ink">
        <p className="flex items-center gap-2 border-b border-ink-border px-4 py-2.5 font-mono text-[12px] uppercase tracking-wide text-on-ink-muted">
          {t.codeEditor}
        </p>

        <div className="flex">
          {/* Satır numaraları: editör hissi ve hata konuşurken ortak dil. */}
          <div
            aria-hidden="true"
            className="select-none border-r border-ink-border px-3 py-4 text-right font-mono text-[13px]/[1.75] text-on-ink-muted"
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <label className="sr-only" htmlFor="code-area">
            {t.codeEditor}
          </label>
          <textarea
            id="code-area"
            ref={areaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            rows={Math.max(lineCount, 6)}
            className="w-full resize-none bg-transparent px-4 py-4 font-mono text-[13px]/[1.75] text-on-ink outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button size="lg" onClick={run}>
          <Play className="size-4" strokeWidth={2.4} aria-hidden="true" />
          {t.checkAnswer}
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => {
            setCode(exercise.starter);
            setResults(null);
          }}
        >
          <RotateCcw className="size-4" strokeWidth={2} aria-hidden="true" />
          {t.reset}
        </Button>
      </div>

      {results ? (
        <ul className="mt-4 flex flex-col gap-2" aria-live="polite">
          {results.map((result, i) => (
            <li
              key={i}
              className={cn(
                "flex items-start gap-2.5 rounded-2xl px-4 py-3 text-[13.5px]/[1.6]",
                result.ok ? "bg-success-surface text-text" : "bg-danger-surface text-text",
              )}
            >
              {result.ok ? (
                <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
              ) : (
                <X className="mt-0.5 size-4 shrink-0 text-danger" strokeWidth={3} aria-hidden="true" />
              )}
              {result.message}
            </li>
          ))}
        </ul>
      ) : null}

      {solved ? (
        <p className="mt-3 rounded-2xl bg-accent-soft px-4 py-3 text-[14px]/[1.6] font-medium text-accent-text">
          {exercise.solvedMessage[locale]}
        </p>
      ) : null}

      <p className="mt-3 text-[12.5px] text-text-subtle">{t.codeCheckNote}</p>
    </div>
  );
}
