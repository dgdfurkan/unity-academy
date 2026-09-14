"use client";

import Link from "next/link";

import { Flame, Play, RotateCcw, Sparkles } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { LessonNode, type NodeState } from "@/components/app/LessonNode";
import { PageHeader } from "@/components/app/PageHeader";
import { StatTile } from "@/components/app/StatTile";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { getDictionary, type Locale } from "@/i18n";
import { hasLesson } from "@/content/lessons";
import { lessonId, useProgress } from "@/lib/progress";
import { route } from "@/lib/routes";


export function LearnPath({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.app;
  const { user } = useAuth();
  const { progress, loaded } = useProgress(user?.id);
  const reduced = useReducedMotion();

  const modules = dict.curriculum.items;
  const learnHref = route("learn", locale);

  // Sıradaki ders: tamamlanmamış ilk ders. Hepsi bitmişse null.
  const flat = modules.flatMap((mod, mi) =>
    mod.lessons.map((title, li) => ({ id: lessonId(mi, li), title, moduleIndex: mi, lessonIndex: li })),
  );
  const next = flat.find((lesson) => !progress.completed.includes(lesson.id)) ?? null;

  const stateOf = (id: string): NodeState => {
    if (progress.completed.includes(id)) return "done";
    if (next?.id === id) return hasLesson(id) ? "current" : "soon";
    // Yazılmamış ders kilitli değil, sadece içeriği yok. İkisini ayırmak
    // öğrenciye "sen ilerlemedin" ile "biz yazmadık" farkını gösteriyor.
    return hasLesson(id) ? "locked" : "soon";
  };

  return (
    <div className="px-safe mx-auto w-full max-w-4xl py-6 [--gx:1rem] sm:py-10 sm:[--gx:1.5rem]">
      {/* ---------- Karşılama ve sayaçlar ---------- */}
      <header>
        <PageHeader title={`${t.greeting}${user ? `, ${user.name.split(" ")[0]}` : ""}`} />

        <dl className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
          <StatTile
            icon={Flame}
            tone="streak"
            label={t.streak}
            value={progress.streakDays}
            unit={t.streakUnit}
          />
          <StatTile icon={Sparkles} tone="points" label={t.xp} value={progress.xp} />
          <StatTile icon={RotateCcw} tone="review" label={t.review} value={progress.reviewDue} />
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
            <Button size="lg" asChild className="w-full shrink-0 sm:w-auto">
              <Link href={`${learnHref}${next.id}/`}>
                <Play className="size-4" strokeWidth={2.25} aria-hidden="true" />
                {progress.completed.length === 0 ? t.startButton : t.continueButton}
              </Link>
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
                  <LessonNode
                    key={title}
                    index={li}
                    title={title}
                    isLast={li === mod.lessons.length - 1}
                    state={stateOf(lessonId(mi, li))}
                    href={`${learnHref}${lessonId(mi, li)}/`}
                    labels={{
                      done: t.completed,
                      current: t.current,
                      locked: t.locked,
                      soon: t.soon,
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
