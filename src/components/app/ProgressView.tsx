"use client";

import { Flame, Sparkles, Trophy } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
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
    <div className="px-safe mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="font-display text-[1.7rem]/[1.15] font-semibold tracking-[-0.02em] text-text sm:text-[2.1rem]/[1.1]">
        {t.title}
      </h1>
      <p className="mt-2 text-[15px] text-text-muted">{t.lead}</p>

      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric
          icon={Trophy}
          className="bg-mint/15 text-mint-text"
          label={t.lessonsCompleted}
          value={`${progress.completed.length} / ${totalLessons}`}
        />
        <Metric
          icon={Sparkles}
          className="bg-accent-soft text-accent-text"
          label={t.xpTotal}
          value={String(progress.xp)}
        />
        <Metric
          icon={Flame}
          className="bg-sun/25 text-warm-text"
          label={`${t.streakBest} (${dict.app.streakUnit})`}
          value={`${progress.streakDays}`}
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
    <div className="flex items-center gap-3.5 rounded-2xl bg-surface p-4 shadow-sm">
      <span
        aria-hidden="true"
        className={`grid size-11 shrink-0 place-items-center rounded-full ${className}`}
      >
        <Icon className="size-5" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <dt className="truncate text-[13px] text-text-subtle">{label}</dt>
        <dd className="font-display text-[22px] font-semibold tabular-nums leading-tight tracking-[-0.015em] text-text">
          {value}
        </dd>
      </div>
    </div>
  );
}
