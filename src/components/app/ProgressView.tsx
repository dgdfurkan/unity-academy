"use client";

import { Flame, Sparkles, Trophy } from "lucide-react";
import { getDictionary, type Locale } from "@/i18n";
import { lessonId, useProgress } from "@/lib/progress";

export function ProgressView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.progressPage;
  const { progress } = useProgress();
  const modules = dict.curriculum.items;
  const totalLessons = modules.reduce((n, mod) => n + mod.lessons.length, 0);

  return (
    <div className="px-safe mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="text-[1.6rem]/[1.2] font-semibold tracking-[-0.025em] text-text sm:text-[2rem]/[1.15]">
        {t.title}
      </h1>
      <p className="mt-2 text-[15px] text-text-muted">{t.lead}</p>

      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric
          icon={Trophy}
          className="text-success"
          label={t.lessonsCompleted}
          value={`${progress.completed.length} / ${totalLessons}`}
        />
        <Metric
          icon={Sparkles}
          className="text-accent-text"
          label={t.xpTotal}
          value={String(progress.xp)}
        />
        <Metric
          icon={Flame}
          className="text-warning"
          label={t.streakBest}
          value={`${progress.streakDays} ${dict.app.streakUnit}`}
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
            <li key={mod.title} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[14.5px] font-medium text-text">
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

function Metric({
  icon: Icon,
  className,
  label,
  value,
}: {
  icon: typeof Flame;
  className: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <dt className="flex items-center gap-2 text-[13px] text-text-subtle">
        <Icon className={`size-4 ${className}`} strokeWidth={2} aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1.5 text-[22px] font-semibold tabular-nums tracking-[-0.015em] text-text">
        {value}
      </dd>
    </div>
  );
}
