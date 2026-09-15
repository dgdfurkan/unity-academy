"use client";

import { Check, X } from "lucide-react";
import type { LessonSection } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Dersin bölümlerini gösteren sol ray. Öğrenci nerede olduğunu ve neyin
 * kaldığını tek bakışta görüyor; bitirdiği bölüme geri dönebiliyor.
 *
 * Masaüstünde sabit, dar ekranda çekmece olarak açılıyor.
 */
export function StageRail({
  sections,
  activeSection,
  furthestSection,
  xp,
  locale,
  open,
  onClose,
  onPick,
}: {
  sections: LessonSection[];
  activeSection: number;
  /** Ulaşılmış en ileri bölüm; sonrası kilitli görünür. */
  furthestSection: number;
  xp: number;
  locale: Locale;
  open: boolean;
  onClose: () => void;
  onPick: (index: number) => void;
}) {
  const dict = getDictionary(locale);
  const t = dict.lesson;

  return (
    <>
      {/* Çekmece açıkken arkadaki içeriğe dokunmayı engelleyen katman */}
      {open ? (
        <button
          type="button"
          aria-label={t.closeRail}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      {/* Kapalı çekmece görünmez ve erişilebilirlik ağacının dışında olur.
          Sadece kaydırmak, öğeleri odaklanabilir bırakıyor ve dar ekranda
          yatay kaydırma üretiyordu. */}
      <aside
        aria-label={t.stages}
        aria-hidden={open ? undefined : true}
        inert={open ? undefined : true}
        className={cn(
          "pt-safe pb-safe pl-safe fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col",
          "border-r border-border bg-surface/95 backdrop-blur-xl",
          "transition-[transform,visibility] duration-(--dur-slow) ease-(--ease-soft)",
          "lg:visible lg:z-30 lg:translate-x-0",
          open ? "visible translate-x-0" : "invisible -translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-subtle">
            {t.stages}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeRail}
            className="grid size-11 cursor-pointer place-items-center rounded-full text-text-subtle hover:bg-surface-2 hover:text-text lg:hidden"
          >
            <X className="size-4" strokeWidth={2.2} />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 px-3">
          {sections.map((section, i) => {
            const done = i < furthestSection;
            const locked = i > furthestSection;
            const active = i === activeSection;

            return (
              <button
                key={section.title[locale]}
                type="button"
                disabled={locked}
                onClick={() => onPick(i)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-2.5 rounded-2xl p-2.5 text-left",
                  "transition-colors duration-(--dur-fast)",
                  locked && "opacity-45",
                  !locked && "cursor-pointer",
                  active
                    ? "bg-accent-soft ring-1 ring-accent/35"
                    : !locked && "hover:bg-surface-2",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-9 place-items-center rounded-xl text-[13px] font-extrabold",
                    active && "idle-bounce bg-accent text-on-accent solid-sm [--solid-shadow:#4f25c4]",
                    done && "bg-mint/20 text-mint-text",
                    !active && !done && "bg-surface-2 text-text-subtle",
                  )}
                >
                  {locked ? "·" : done ? <Check className="size-4" strokeWidth={3.2} /> : section.glyph}
                </span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block truncate text-[13.5px] font-semibold",
                      active ? "text-accent-text" : "text-text",
                    )}
                  >
                    {section.title[locale]}
                  </span>
                  <span className="block truncate text-[11.5px] text-text-subtle">
                    {section.subtitle[locale]}
                  </span>
                </span>

                {done ? (
                  <Check className="size-4 text-mint-text" strokeWidth={3} aria-hidden="true" />
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Ders ilerlemesi */}
        <div className="mt-auto m-3 rounded-2xl bg-surface-2 p-4">
          <p className="flex items-center justify-between text-[12px] text-text-muted">
            {t.lessonProgress}
            <strong className="font-mono text-accent-text">{xp} XP</strong>
          </p>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-surface-3">
            <div
              className="progress-shine h-full origin-left rounded-full transition-transform duration-(--dur-slow) ease-(--ease-out)"
              style={{ transform: `scaleX(${Math.min(xp / 200, 1)})` }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

/** Dersin kavrama yüzdesini gösteren halka. */
export function MasteryRing({ percent, locale }: { percent: number; locale: Locale }) {
  const t = getDictionary(locale).lesson;
  return (
    <div
      role="img"
      aria-label={`${t.mastery}: %${percent}`}
      className="relative grid size-28 shrink-0 place-items-center rounded-full transition-[background] duration-(--dur-slow)"
      style={{
        background: `conic-gradient(var(--accent) ${percent}%, var(--surface-3) 0)`,
      }}
    >
      <span aria-hidden="true" className="absolute inset-2 rounded-full bg-bg" />
      <span className="relative text-center">
        <strong className="block font-display text-[24px] font-semibold tracking-[-0.03em] text-text">
          %{percent}
        </strong>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-text-subtle">
          {t.mastery}
        </span>
      </span>
    </div>
  );
}
