"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import type { Activity } from "@/content/types";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Dokun ve gör kartları. Sınav değil: yanlış cevap yok. Kısa bir metinden
 * sonra öğrencinin eli değsin, üç beş terimi kendi hızında açsın diye var.
 */
export function RevealCards({
  activity,
  locale,
  onDone,
}: {
  activity: Extract<Activity, { kind: "reveal" }>;
  locale: Locale;
  onDone?: () => void;
}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      if (next.size === activity.cards.length) onDone?.();
      return next;
    });
  }

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{activity.question[locale]}</p>

      <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {activity.cards.map((card, i) => {
          const isOpen = open.has(i);
          return (
            <li key={card.front[locale]}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className={cn(
                  "flex w-full cursor-pointer flex-col gap-2 rounded-2xl p-4 text-left ring-1",
                  "transition-[background-color,box-shadow] duration-(--dur-fast)",
                  isOpen
                    ? "bg-accent-soft ring-accent"
                    : "bg-surface shadow-sm ring-border hover:ring-border-strong",
                )}
              >
                <span className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "text-[15px] font-semibold",
                      isOpen ? "text-accent-text" : "text-text",
                    )}
                  >
                    {card.front[locale]}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full transition-transform duration-(--dur-fast)",
                      isOpen
                        ? "rotate-45 bg-accent text-on-accent"
                        : "bg-surface-2 text-text-subtle",
                    )}
                  >
                    <Plus className="size-3.5" strokeWidth={3} />
                  </span>
                </span>

                {isOpen ? (
                  <m.span
                    initial={reduced ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    className="block overflow-hidden text-[14px]/[1.6] text-text-muted"
                  >
                    {card.back[locale]}
                  </m.span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
