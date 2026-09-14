"use client";

import { Flame, Sparkles, Trophy } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { PageHeader } from "@/components/app/PageHeader";
import { StatTile } from "@/components/app/StatTile";
import { getDictionary, type Locale } from "@/i18n";
import { lessonId, useProgress } from "@/lib/progress";

export function ProgressView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.progressPage;
  const { user } = useAuth();
  const { progress } = useProgress(user?.id);
  const modules = dict.curriculum.items;
  const totalLessons = modules.reduce((n, mod) => n + mod.lessons.length, 0);

  return (
    <div className="px-safe mx-auto w-full max-w-4xl py-6 [--gx:1rem] sm:py-10 sm:[--gx:1.5rem]">
      <PageHeader title={t.title} lead={t.lead} />

      <dl className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
        <StatTile
          icon={Trophy}
          tone="lessons"
          label={t.lessonsCompleted}
          value={progress.completed.length}
          suffix={`/ ${totalLessons}`}
        />
        <StatTile icon={Sparkles} tone="points" label={t.xpTotal} value={progress.xp} />
        <StatTile
          icon={Flame}
          tone="streak"
          label={t.streakBest}
          value={progress.streakDays}
          unit={dict.app.streakUnit}
        />
      </dl>

      <h2 className="mt-10 text-[13px] font-medium uppercase tracking-wide text-text-subtle">
        {t.byModule}
      </h2>

      <ul className="mt-4 flex flex-col gap-3">
        {modules.map((mod, mi) => {
          const done = mod.lessons.filter((_, li) =>
            progress.completed.includes(lessonId(mi, li)),
          ).length;
          const pct = Math.round((done / mod.lessons.length) * 100);

          return (
            <li key={mod.title} className="rounded-2xl bg-surface shadow-sm p-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[16px] font-semibold text-text">
                  <span className="font-mono text-[12.5px] text-accent-text">
                    {String(mi + 1).padStart(2, "0")}
                  </span>{" "}
                  {mod.title}
                </h3>
                <span className="shrink-0 text-[13px] tabular-nums text-text-subtle">
                  {done}/{mod.lessons.length}
                </span>
              </div>

              {/* Genişlik yerine scaleX: düzen hesabı tetiklenmiyor. */}
              <div
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={mod.title}
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-3"
              >
                <div
                  className="h-full origin-left rounded-full bg-accent transition-transform duration-(--dur-slow) ease-(--ease-out)"
                  style={{ transform: `scaleX(${pct / 100})` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
