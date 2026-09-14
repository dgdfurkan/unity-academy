"use client";

import { Check, Flame, Lock, Play, RotateCcw, Sparkles } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { PageHeader } from "@/components/app/PageHeader";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { getDictionary, type Locale } from "@/i18n";
import { lessonId, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type NodeState = "done" | "current" | "locked";

const XP_PER_LESSON = 20;

export function LearnPath({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.app;
  const { user } = useAuth();
  const { progress, loaded } = useProgress(user?.id);
  const reduced = useReducedMotion();

  const modules = dict.curriculum.items;

  // Sıradaki ders: tamamlanmamış ilk ders. Hepsi bitmişse null.
  const flat = modules.flatMap((mod, mi) =>
    mod.lessons.map((title, li) => ({ id: lessonId(mi, li), title, moduleIndex: mi, lessonIndex: li })),
  );
  const next = flat.find((lesson) => !progress.completed.includes(lesson.id)) ?? null;

  const stateOf = (id: string): NodeState => {
    if (progress.completed.includes(id)) return "done";
    if (next?.id === id) return "current";
    return "locked";
  };

  return (
    <div className="px-safe mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      {/* ---------- Karşılama ve sayaçlar ---------- */}
      <header>
        <PageHeader title={`${t.greeting}${user ? `, ${user.name.split(" ")[0]}` : ""}`} />

        <dl className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
          <Stat
            icon={Flame}
            tone="warning"
            label={t.streak}
            value={String(progress.streakDays)}
            unit={t.streakUnit}
          />
          <Stat icon={Sparkles} tone="accent" label={t.xp} value={String(progress.xp)} />
          <Stat
            icon={RotateCcw}
            tone="info"
            label={t.review}
            value={progress.reviewDue > 0 ? `${progress.reviewDue}` : "0"}
          />
        </dl>
      </header>

      {/* ---------- Kaldığın yer ---------- */}
      {loaded && next ? (
        <m.section
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-6 overflow-hidden rounded-2xl bg-surface shadow-md p-5 sm:p-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-accent/10 blur-[80px]"
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[12px] font-medium uppercase tracking-wide text-text-subtle">
                {t.continueTitle}
              </p>
              <h2 className="mt-1.5 truncate font-display text-[19px] font-semibold tracking-[-0.015em] text-text sm:text-[21px]">
                {next.title}
              </h2>
              <p className="mt-1 text-[13.5px] text-text-muted">
                {t.moduleLabel} {next.moduleIndex + 1} · {modules[next.moduleIndex]?.title}
              </p>
            </div>
            <Button size="lg" className="w-full shrink-0 sm:w-auto">
              <Play className="size-4" strokeWidth={2.25} aria-hidden="true" />
              {progress.completed.length === 0 ? t.startButton : t.continueButton}
            </Button>
          </div>
        </m.section>
      ) : null}

      {/* ---------- Yol ---------- */}
      <h2 className="mt-10 text-[13px] font-medium uppercase tracking-wide text-text-subtle">
        {t.pathTitle}
      </h2>

      <div className="mt-4 flex flex-col gap-8">
        {modules.map((mod, mi) => {
          const done = mod.lessons.filter((_, li) => progress.completed.includes(lessonId(mi, li)))
            .length;

          return (
            <section key={mod.title}>
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <h3 className="font-display text-[17px] font-semibold tracking-[-0.01em] text-text">
                  <span className="font-mono text-[13px] text-accent-text">
                    {String(mi + 1).padStart(2, "0")}
                  </span>{" "}
                  {mod.title}
                </h3>
                <p className="shrink-0 text-[13px] text-text-subtle">
                  {done}/{mod.lessons.length} {t.lessonsDone}
                </p>
              </div>

              <ol className="relative mt-5 flex flex-col gap-3">
                {mod.lessons.map((title, li) => (
                  <PathNode
                    key={title}
                    index={li}
                    title={title}
                    isLast={li === mod.lessons.length - 1}
                    state={stateOf(lessonId(mi, li))}
                    labels={{
                      done: t.completed,
                      current: t.current,
                      locked: t.locked,
                      lockedHint: t.lockedHint,
                    }}
                  />
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ parçalar ------------------------------ */

const TONE = {
  warning: "bg-sun/25 text-warm-text",
  accent: "bg-accent-soft text-accent-text",
  info: "bg-sky/15 text-sky-text",
} as const;

function Stat({
  icon: Icon,
  tone,
  label,
  value,
  unit,
}: {
  icon: typeof Flame;
  tone: keyof typeof TONE;
  label: string;
  value: string;
  /** Sayının yanına küçük punto ile gelir; etikete sığmayınca kesiliyordu. */
  unit?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-sm sm:p-3.5">
      <span
        aria-hidden="true"
        className={cn("grid size-10 shrink-0 place-items-center rounded-full", TONE[tone])}
      >
        <Icon className="size-[18px]" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <dt className="truncate text-[12px] font-medium text-text-subtle">{label}</dt>
        <dd className="font-display text-[19px] font-semibold tabular-nums leading-tight tracking-[-0.01em] text-text">
          {value}
          {unit ? (
            <span className="ml-1 font-sans text-[12px] font-medium text-text-subtle">{unit}</span>
          ) : null}
        </dd>
      </div>
    </div>
  );
}

function PathNode({
  index,
  title,
  state,
  isLast,
  labels,
}: {
  index: number;
  title: string;
  state: NodeState;
  isLast: boolean;
  labels: { done: string; current: string; locked: string; lockedHint: string };
}) {
  const locked = state === "locked";

  return (
    <li className="relative">
      {/* Düğümleri birleştiren çizgi. Son düğümden sonra bağlanacak bir şey yok. */}
      {isLast ? null : (
        <span
          aria-hidden="true"
          className="absolute left-[27px] top-[3.9rem] h-3 w-0.5 rounded-full bg-border-strong"
        />
      )}
      <button
        type="button"
        disabled={locked}
        aria-describedby={locked ? `locked-${index}` : undefined}
        className={cn(
          "group flex w-full items-center gap-3.5 rounded-2xl border-2 px-3.5 py-3 text-left",
          "transition-colors duration-(--dur-fast)",
          locked
            ? "cursor-not-allowed border-transparent bg-surface/55"
            : "cursor-pointer border-transparent bg-surface shadow-sm hover:-translate-y-px hover:shadow-md motion-reduce:hover:translate-y-0",
          state === "current" && "border-accent bg-surface shadow-md",
        )}
      >
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full border",
            state === "done" && "border-transparent bg-mint text-white",
            state === "current" && "border-transparent bg-accent text-on-accent",
            locked && "border-transparent bg-surface-2 text-text-subtle",
          )}
        >
          {state === "done" ? (
            <Check className="size-5" strokeWidth={2.5} aria-hidden="true" />
          ) : state === "current" ? (
            <Play className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <Lock className="size-[17px]" strokeWidth={1.75} aria-hidden="true" />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block text-[14.5px] font-medium tracking-[-0.005em]",
              locked ? "text-text-subtle" : "text-text",
            )}
          >
            {title}
          </span>
          {/* Durum yalnızca renkle taşınmaz, metinle de yazılır. */}
          <span className="mt-0.5 block text-[12.5px] text-text-subtle">
            {state === "done" ? labels.done : state === "current" ? labels.current : labels.locked}
          </span>
        </span>
      </button>

      {locked ? (
        <span id={`locked-${index}`} className="sr-only">
          {labels.lockedHint}
        </span>
      ) : null}
    </li>
  );
}
