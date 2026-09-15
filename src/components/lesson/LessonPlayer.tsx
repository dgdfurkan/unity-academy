"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Flame,
  Lightbulb,
  PanelsTopLeft,
  PartyPopper,
  Sparkles,
  Target,
} from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useAuth } from "@/components/auth/AuthProvider";
import { CableBoard } from "@/components/activity/CableBoard";
import { Hotspots } from "@/components/activity/Hotspots";
import { RevealCards } from "@/components/activity/RevealCards";
import { SortBuckets } from "@/components/activity/SortBuckets";
import { ChoiceExercise } from "@/components/lesson/ChoiceExercise";
import { CodeExercise } from "@/components/lesson/CodeExercise";
import { FillExercise } from "@/components/lesson/FillExercise";
import { InspectorExercise } from "@/components/lesson/InspectorExercise";
import { OrderExercise } from "@/components/lesson/OrderExercise";
import { LessonComments } from "@/components/lesson/LessonComments";
import { MatchExercise } from "@/components/lesson/MatchExercise";
import { SpotExercise } from "@/components/lesson/SpotExercise";
import { TeachBlocks } from "@/components/lesson/TeachBlocks";
import { SimExercise } from "@/components/lesson/SimExercise";
import { MasteryRing, StageRail } from "@/components/lesson/StageRail";
import { useFeedback } from "@/components/feedback/FeedbackProvider";
import { ArrowBadge, Button } from "@/components/ui/Button";
import type { Activity, Exercise, Lesson, Step } from "@/content/types";
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

  const { celebrate, toast, buzz } = useFeedback();

  const [stepIndex, setStepIndex] = useState(0);
  const [earned, setEarned] = useState(0);
  const [solvedKeys, setSolvedKeys] = useState<Set<string>>(new Set());
  const solvedRef = useRef<Set<string>>(new Set());
  const [finished, setFinished] = useState(false);
  const [railOpen, setRailOpen] = useState(false);

  // Bölümler verilmemişse tek bölümlük bir ders gibi davranır ve ray gizlenir.
  const sections = lesson.sections ?? [];
  const hasRail = sections.length > 1;
  const sectionOf = (index: number) => lesson.steps[index]?.section ?? 0;
  const activeSection = sectionOf(stepIndex);
  const furthestSection = Math.max(...lesson.steps.slice(0, stepIndex + 1).map((s) => s.section ?? 0));
  const masteryPercent = Math.round(((stepIndex + 1) / lesson.steps.length) * 100);

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

  /**
   * Bu adımdan devam edilebilir mi? Alıştırma adımı çözülmeden geçilmez;
   * öğretici etkinlik ve metin adımları serbesttir.
   */
  function stepSolved(current: Step, index: number): boolean {
    if (current.kind === "predict" || current.kind === "task") {
      return solvedKeys.has(`${index}-0`);
    }
    if (current.kind === "check") {
      return current.exercises.every((_, i) => solvedKeys.has(`${index}-${i}`));
    }
    return true;
  }

  /**
   * State güncelleyicileri saf kalmalı: yan etkiyi içeride çağırmak React'in
   * "render sırasında başka bileşeni güncelleme" uyarısını veriyordu.
   * Tekrarı ref ile engelleyip yan etkileri dışarıda çalıştırıyoruz.
   */
  function markSolved(key: string, attempts: number) {
    if (solvedRef.current.has(key)) return;
    solvedRef.current.add(key);
    setSolvedKeys(new Set(solvedRef.current));
    setEarned((total) => total + scoreFor(attempts));
    buzz([15, 25, 30]);
    celebrate(14);
  }

  /**
   * Adım değişince sayfa başa döner. Yumuşak kaydırma değil anında:
   * uzun bir adımdan sonra ekranın yavaşça yukarı süzülmesini beklemek
   * akışı kesiyor.
   */
  function toTop() {
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function goNext() {
    if (!isLast) {
      const from = sectionOf(stepIndex);
      const to = sectionOf(stepIndex + 1);
      if (hasRail && to !== from) {
        celebrate(20);
        toast(`${t.sectionDoneToast} · ${sections[from]?.title[locale] ?? ""}`);
      }
      setStepIndex((i) => i + 1);
      toTop();
      return;
    }
    if (!progress.completed.includes(lesson.id)) {
      complete(lesson.id, LESSON_XP + earned);
    }
    setFinished(true);
    celebrate(70);
    toast(`${t.lessonDoneToast} · +${LESSON_XP + earned} XP`);
    toTop();
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
    toTop();
  }

  /** Raydan bir bölüme atlar: o bölümün ilk adımına gider. */
  function goSection(index: number) {
    const target = lesson.steps.findIndex((step) => (step.section ?? 0) === index);
    if (target < 0) return;
    setStepIndex(target);
    setRailOpen(false);
    toTop();
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
    <div className={hasRail ? "lg:pl-[17rem]" : undefined}>
      {hasRail ? (
        <StageRail
          sections={sections}
          activeSection={activeSection}
          furthestSection={furthestSection}
          xp={earned}
          locale={locale}
          open={railOpen}
          onClose={() => setRailOpen(false)}
          onPick={goSection}
        />
      ) : null}

      <div className="px-safe mx-auto w-full max-w-3xl py-5 [--gx:1rem] sm:py-8 sm:[--gx:1.5rem]">
        {/* Üst şerit: geri dönüş, aşama listesi, sayaçlar */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href={route("learn", locale)}
            className="-ml-2 inline-flex h-11 items-center gap-1.5 rounded-full px-2 text-[14px] text-text-subtle transition-colors duration-(--dur-instant) hover:text-text"
          >
            <ArrowLeft className="size-4" strokeWidth={1.9} aria-hidden="true" />
            {t.backToPath}
          </Link>

          <div className="flex items-center gap-2">
            {earned > 0 ? (
              <span className="solid-sm flex h-9 items-center gap-1.5 rounded-full bg-surface px-3 text-[12.5px] font-semibold text-text ring-1 ring-border [--solid-shadow:var(--surface-3)]">
                <Sparkles className="size-3.5 text-accent-text" strokeWidth={2.4} aria-hidden="true" />
                {earned} XP
              </span>
            ) : null}
            <span className="solid-sm flex h-9 items-center gap-1.5 rounded-full bg-surface px-3 text-[12.5px] font-semibold text-text ring-1 ring-border [--solid-shadow:var(--surface-3)]">
              <Flame className="size-3.5 text-warm-text" strokeWidth={2.4} aria-hidden="true" />
              {stepIndex + 1}/{total}
            </span>
            {hasRail ? (
              <button
                type="button"
                onClick={() => setRailOpen(true)}
                aria-label={t.openRail}
                className="solid-sm grid size-11 cursor-pointer place-items-center rounded-full bg-surface text-accent-text ring-1 ring-border [--solid-shadow:var(--surface-3)] lg:hidden"
              >
                <PanelsTopLeft className="size-[18px]" strokeWidth={2} />
              </button>
            ) : null}
          </div>
        </div>

        {/* Ders başlığı ve kavrama halkası */}
        <header className="mt-4 flex items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.1em] text-accent-text">
              <span aria-hidden="true" className="h-[3px] w-5 rounded-full bg-warm" />
              {dict.app.moduleLabel} {lesson.moduleIndex + 1} · {moduleTitle}
            </p>
            <h1 className="mt-2 font-display text-[1.6rem]/[1.15] font-semibold tracking-[-0.03em] text-text sm:text-[2.1rem]/[1.1]">
              {lessonTitle}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-[13px] text-text-subtle">
              <Clock className="size-3.5" strokeWidth={2} aria-hidden="true" />
              {lesson.minutes} {t.minutes}
            </p>
          </div>
          <div className="hidden sm:block">
            <MasteryRing percent={masteryPercent} locale={locale} />
          </div>
        </header>

        {/* İlerleme çubuğu */}
        <div
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          className="mt-5 h-3 overflow-hidden rounded-full bg-surface-3 shadow-[inset_0_2px_3px_rgba(79,50,139,.06)]"
        >
          <div
            className="progress-shine h-full origin-left rounded-full transition-transform duration-(--dur-slow) ease-(--ease-out)"
            style={{ transform: `scaleX(${(stepIndex + 1) / total})` }}
          />
        </div>

        {/* Adım içeriği */}
        <m.section
          key={stepIndex}
          initial={reduced ? false : { opacity: 0, x: 24, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <div className="solid-lg overflow-hidden rounded-[1.75rem] bg-surface ring-1 ring-border [--solid-shadow:var(--surface-3)]">
            <div className="flex min-h-[4.5rem] items-center gap-3 border-b border-border bg-gradient-to-r from-accent-soft to-surface px-4 py-3 sm:px-5">
              <span
                aria-hidden="true"
                className="idle-wiggle grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-accent-text ring-1 ring-border solid-sm [--solid-shadow:var(--surface-3)]"
              >
                <StepGlyph kind={step.kind} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-text">
                  {hasRail ? sections[activeSection]?.title[locale] : lessonTitle}
                </p>
                <p className="truncate text-[12px] text-text-subtle">
                  {hasRail ? sections[activeSection]?.subtitle[locale] : null}
                </p>
              </div>
              <StepLabel kind={step.kind} locale={locale} />
            </div>

            <div className="p-4 sm:p-6">
              <StepBody
                step={step}
                stepIndex={stepIndex}
                locale={locale}
                solvedKeys={solvedKeys}
                onSolved={markSolved}
              />
            </div>
          </div>
        </m.section>

        {/* Gezinti */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <Button variant="ghost" size="lg" disabled={stepIndex === 0} onClick={goBack}>
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
    </div>
  );
}

/* ------------------------------ parçalar ------------------------------ */

const LABEL_TONE: Record<Step["kind"], string> = {
  read: "bg-accent-soft text-accent-text",
  activity: "bg-sky/15 text-sky-text",
  task: "bg-mint/15 text-mint-text",
  hook: "bg-warm/15 text-warm-text",
  predict: "bg-sky/15 text-sky-text",
  teach: "bg-accent-soft text-accent-text",
  check: "bg-mint/15 text-mint-text",
  summary: "bg-sun/25 text-warm-text",
};

/** Adım tipini temsil eden işaret. Kart başlığındaki kutuda durur. */
function StepGlyph({ kind }: { kind: Step["kind"] }) {
  const Icon = {
    read: BookOpen,
    activity: Sparkles,
    task: Target,
    hook: Lightbulb,
    predict: Lightbulb,
    teach: BookOpen,
    check: Target,
    summary: PartyPopper,
  }[kind];
  return <Icon className="size-5" strokeWidth={2} aria-hidden="true" />;
}

function StepLabel({ kind, locale }: { kind: Step["kind"]; locale: Locale }) {
  const t = getDictionary(locale).lesson;
  const text = {
    read: t.read,
    activity: t.activity,
    task: t.task,
    hook: t.hook,
    predict: t.predict,
    teach: t.teach,
    check: t.check,
    summary: t.summary,
  }[kind];
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
    case "read":
      return (
        <div>
          <h2 className="font-display text-[1.3rem]/[1.3] font-semibold tracking-[-0.015em] text-text sm:text-[1.5rem]/[1.25]">
            {step.title[locale]}
          </h2>
          <p className="mt-3 max-w-[40rem] text-[16px]/[1.75] text-text">{step.text[locale]}</p>
          {step.blocks ? (
            <div className="mt-6">
              <TeachBlocks blocks={step.blocks} locale={locale} />
            </div>
          ) : null}
        </div>
      );

    case "activity":
      return <ActivityView activity={step.activity} locale={locale} />;

    case "task":
      return (
        <ExerciseView
          exercise={step.exercise}
          locale={locale}
          onSolved={(attempts) => onSolved(`${stepIndex}-0`, attempts)}
        />
      );

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

function ActivityView({ activity, locale }: { activity: Activity; locale: Locale }) {
  switch (activity.kind) {
    case "reveal":
      return <RevealCards activity={activity} locale={locale} />;
    case "sort":
      return <SortBuckets activity={activity} locale={locale} />;
    case "hotspot":
      return <Hotspots activity={activity} locale={locale} />;
    case "cable":
      return <CableBoard activity={activity} locale={locale} />;
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
    case "fill":
      return <FillExercise exercise={exercise} locale={locale} onSolved={onSolved} />;
    case "order":
      return <OrderExercise exercise={exercise} locale={locale} onSolved={onSolved} />;
    case "inspector":
      return <InspectorExercise exercise={exercise} locale={locale} onSolved={onSolved} />;
    case "code":
      return <CodeExercise exercise={exercise} locale={locale} onSolved={onSolved} />;
    case "sim":
      return <SimExercise exercise={exercise} locale={locale} onSolved={onSolved} />;
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
