"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, PartyPopper } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ChoiceExercise } from "@/components/lesson/ChoiceExercise";
import { LessonComments } from "@/components/lesson/LessonComments";
import { MatchExercise } from "@/components/lesson/MatchExercise";
import { SpotExercise } from "@/components/lesson/SpotExercise";
import { TeachBlocks } from "@/components/lesson/TeachBlocks";
import { ArrowBadge, Button } from "@/components/ui/Button";
import type { Exercise, Lesson, Step } from "@/content/types";
import { getLesson } from "@/content/lessons";
import { getDictionary, type Locale } from "@/i18n";
import { lessonId, useProgress } from "@/lib/progress";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";

/** Alıştırma puanı deneme sayısına göre azalır, ama sıfırlanmaz. */
function scoreFor(attempts: number) {
  if (attempts <= 1) return 10;
  if (attempts === 2) return 6;
  return 3;
}

const LESSON_XP = 20;

export function LessonPlayer({ lesson, locale }: { lesson: Lesson; locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.lesson;
  const router = useRouter();
  const reduced = useReducedMotion();
  const { user } = useAuth();
  const { progress, complete } = useProgress(user?.id);

  const [stepIndex, setStepIndex] = useState(0);
  const [earned, setEarned] = useState(0);
  const [solvedKeys, setSolvedKeys] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState(false);

  const step = lesson.steps[stepIndex];
  const total = lesson.steps.length;
  const isLast = stepIndex === total - 1;

  const modules = dict.curriculum.items;
  const moduleTitle = modules[lesson.moduleIndex]?.title ?? "";
  const lessonTitle = modules[lesson.moduleIndex]?.lessons[lesson.lessonIndex] ?? "";

  // Sıradaki ders, aynı modülün devamı ya da sonraki modülün ilki.
  const nextId = useMemo(() => {
    const sameModule = modules[lesson.moduleIndex]?.lessons.length ?? 0;
    if (lesson.lessonIndex + 1 < sameModule) {
      return lessonId(lesson.moduleIndex, lesson.lessonIndex + 1);
    }
    return modules[lesson.moduleIndex + 1]
      ? lessonId(lesson.moduleIndex + 1, 0)
      : null;
  }, [modules, lesson.moduleIndex, lesson.lessonIndex]);

  const nextExists = nextId ? getLesson(nextId) !== null : false;

  /** Bu adımdaki bütün alıştırmalar çözüldü mü? */
  function stepSolved(current: Step, index: number): boolean {
    if (current.kind === "predict") return solvedKeys.has(`${index}-0`);
    if (current.kind === "check") {
      return current.exercises.every((_, i) => solvedKeys.has(`${index}-${i}`));
    }
    return true;
  }

  function markSolved(key: string, attempts: number) {
    setSolvedKeys((current) => {
      if (current.has(key)) return current;
      const next = new Set(current);
      next.add(key);
      setEarned((points) => points + scoreFor(attempts));
      return next;
    });
  }

  function goNext() {
    if (!isLast) {
      setStepIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      return;
    }
    if (!progress.completed.includes(lesson.id)) {
      complete(lesson.id, LESSON_XP + earned);
    }
    setFinished(true);
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  if (finished) {
    return (
      <Done
        locale={locale}
        points={LESSON_XP + earned}
        nextHref={nextId && nextExists ? `${route("learn", locale)}${nextId}/` : null}
        pathHref={route("learn", locale)}
      />
    );
  }

  if (!step) return null;

  const canContinue = stepSolved(step, stepIndex);

  return (
    <div className="px-safe mx-auto w-full max-w-3xl py-5 [--gx:1rem] sm:py-8 sm:[--gx:1.5rem]">
      {/* Başlık ve ilerleme */}
      <header>
        <Link
          href={route("learn", locale)}
          className="-ml-2 inline-flex h-11 items-center gap-1.5 rounded-full px-2 text-[14px] text-text-subtle transition-colors duration-(--dur-instant) hover:text-text"
        >
          <ArrowLeft className="size-4" strokeWidth={1.9} aria-hidden="true" />
          {t.backToPath}
        </Link>

        <p className="mt-3 text-[13px] font-medium text-accent-text">
          {dict.app.moduleLabel} {lesson.moduleIndex + 1} · {moduleTitle}
        </p>
        <h1 className="mt-1 font-display text-[1.6rem]/[1.2] font-semibold tracking-[-0.02em] text-text sm:text-[2rem]/[1.15]">
          {lessonTitle}
        </h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[13px] text-text-subtle">
            <Clock className="size-3.5" strokeWidth={2} aria-hidden="true" />
            {lesson.minutes} {t.minutes}
          </span>
          <span className="text-[13px] text-text-subtle">
            {t.stepOf} {stepIndex + 1}/{total}
          </span>
        </div>

        {/* İlerleme çubuğu: genişlik değil scaleX, düzen hesabı tetiklenmiyor. */}
        <div
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-3"
        >
          <div
            className="h-full origin-left rounded-full bg-accent transition-transform duration-(--dur-slow) ease-(--ease-out)"
            style={{ transform: `scaleX(${(stepIndex + 1) / total})` }}
          />
        </div>
      </header>

      {/* Adım içeriği */}
      <m.section
        key={stepIndex}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8"
      >
        <StepLabel kind={step.kind} locale={locale} />
        <div className="mt-4">
          <StepBody
            step={step}
            stepIndex={stepIndex}
            locale={locale}
            solvedKeys={solvedKeys}
            onSolved={markSolved}
          />
        </div>
      </m.section>

      {/* Gezinti */}
      <div className="mt-10 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="lg"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((i) => Math.max(i - 1, 0))}
        >
          {t.back}
        </Button>
        <Button size="lg" className="group" disabled={!canContinue} onClick={goNext}>
          {isLast ? t.finish : t.continue}
          <ArrowBadge>
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </ArrowBadge>
        </Button>
      </div>

      <LessonComments lessonId={lesson.id} locale={locale} />
    </div>
  );
}

/* ------------------------------ parçalar ------------------------------ */

const LABEL_TONE: Record<Step["kind"], string> = {
  hook: "bg-warm/15 text-warm-text",
  predict: "bg-sky/15 text-sky-text",
  teach: "bg-accent-soft text-accent-text",
  check: "bg-mint/15 text-mint-text",
  summary: "bg-sun/25 text-warm-text",
};

function StepLabel({ kind, locale }: { kind: Step["kind"]; locale: Locale }) {
  const t = getDictionary(locale).lesson;
  const text = { hook: t.hook, predict: t.predict, teach: t.teach, check: t.check, summary: t.summary }[kind];
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-wide",
        LABEL_TONE[kind],
      )}
    >
      {text}
    </span>
  );
}

function StepBody({
  step,
  stepIndex,
  locale,
  solvedKeys,
  onSolved,
}: {
  step: Step;
  stepIndex: number;
  locale: Locale;
  solvedKeys: Set<string>;
  onSolved: (key: string, attempts: number) => void;
}) {
  const t = getDictionary(locale).lesson;

  switch (step.kind) {
    case "hook":
      return (
        <div>
          <h2 className="font-display text-[1.35rem]/[1.3] font-semibold tracking-[-0.015em] text-text sm:text-[1.6rem]/[1.25]">
            {step.title[locale]}
          </h2>
          <p className="mt-3 max-w-[42rem] text-[16px]/[1.75] text-text-muted">
            {step.body[locale]}
          </p>
        </div>
      );

    case "predict":
      return (
        <ExerciseView
          exercise={step.exercise}
          locale={locale}
          onSolved={(attempts) => onSolved(`${stepIndex}-0`, attempts)}
        />
      );

    case "teach":
      return (
        <div>
          <h2 className="font-display text-[1.35rem]/[1.3] font-semibold tracking-[-0.015em] text-text sm:text-[1.6rem]/[1.25]">
            {step.title[locale]}
          </h2>
          <div className="mt-5">
            <TeachBlocks blocks={step.blocks} locale={locale} />
          </div>
        </div>
      );

    case "check":
      return (
        <div className="flex flex-col gap-10">
          {step.exercises.map((exercise, i) => (
            <div key={i}>
              <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-wide text-text-subtle">
                {t.exerciseOf} {i + 1}/{step.exercises.length}
              </p>
              <ExerciseView
                exercise={exercise}
                locale={locale}
                onSolved={(attempts) => onSolved(`${stepIndex}-${i}`, attempts)}
              />
            </div>
          ))}
        </div>
      );

    case "summary":
      return (
        <div>
          <h2 className="font-display text-[1.35rem]/[1.3] font-semibold tracking-[-0.015em] text-text sm:text-[1.6rem]/[1.25]">
            {t.summaryTitle}
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {step.points.map((point) => (
              <li key={point[locale]} className="flex gap-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mint text-white"
                >
                  <Check className="size-3.5" strokeWidth={3.2} />
                </span>
                <span className="text-[15px]/[1.6] text-text">{point[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

function ExerciseView({
  exercise,
  locale,
  onSolved,
}: {
  exercise: Exercise;
  locale: Locale;
  onSolved: (attempts: number) => void;
}) {
  switch (exercise.kind) {
    case "choice":
      return <ChoiceExercise exercise={exercise} locale={locale} onSolved={onSolved} />;
    case "match":
      return <MatchExercise exercise={exercise} locale={locale} onSolved={onSolved} />;
    case "spot":
      return <SpotExercise exercise={exercise} locale={locale} onSolved={onSolved} />;
  }
}

function Done({
  locale,
  points,
  nextHref,
  pathHref,
}: {
  locale: Locale;
  points: number;
  nextHref: string | null;
  pathHref: string;
}) {
  const t = getDictionary(locale).lesson;
  const reduced = useReducedMotion();

  return (
    <div className="px-safe mx-auto w-full max-w-lg py-16 text-center [--gx:1rem] sm:[--gx:1.5rem]">
      <m.div
        initial={reduced ? false : { opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.4, 0.64, 1] }}
        className="mx-auto grid size-20 place-items-center rounded-full bg-mint text-white"
      >
        <PartyPopper className="size-9" strokeWidth={1.9} aria-hidden="true" />
      </m.div>

      <h1 className="mt-6 font-display text-[1.9rem]/[1.15] font-semibold tracking-[-0.02em] text-text">
        {t.doneTitle}
      </h1>
      <p className="mx-auto mt-3 max-w-[24rem] text-[15px]/[1.65] text-text-muted">{t.doneBody}</p>

      <p className="mt-6 inline-flex items-baseline gap-2 rounded-full bg-accent-soft px-5 py-2.5">
        <span className="font-display text-[26px] font-semibold text-accent-text">+{points}</span>
        <span className="text-[14px] font-medium text-accent-text">{t.pointsEarned}</span>
      </p>

      <div className="mt-9 flex flex-col items-center gap-3">
        {nextHref ? (
          <Button size="lg" asChild className="group w-full sm:w-auto">
            <Link href={nextHref}>
              {t.nextLesson}
              <ArrowBadge>
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </ArrowBadge>
            </Link>
          </Button>
        ) : null}
        <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
          <Link href={pathHref}>{t.backToPath}</Link>
        </Button>
      </div>
    </div>
  );
}
