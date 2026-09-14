"use client";

import { Check, Lock, Play } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type NodeState = "done" | "current" | "locked";

export type NodeLabels = {
  done: string;
  current: string;
  locked: string;
  lockedHint: string;
};

/**
 * Yol üzerindeki bir ders. Üç durum var ve durum yalnızca renkle taşınmıyor:
 * ikon da metin de değişiyor.
 *
 * Hizalama daireden çıkıyor: bağlantı çizgisi dairenin tam merkezinden geçsin
 * diye dairenin boyutu, kartın dolgusu ve çizginin konumu tek yerden hesaplanıyor.
 */
const RING = 48; // daire çapı
const PAD = 14; // kart iç dolgusu

export function LessonNode({
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
  labels: NodeLabels;
}) {
  const reduced = useReducedMotion();
  const locked = state === "locked";
  const hintId = `lesson-hint-${index}`;

  return (
    <li className="relative">
      {/* Bağlantı çizgisi: dairenin merkez ekseninde, kartlar arasındaki
          boşluğu kapatıyor. Tamamlanan derste dolu, sonrasında soluk. */}
      {isLast ? null : (
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-full z-0 h-3 w-1 rounded-full",
            state === "done" ? "bg-mint" : "bg-border",
          )}
          style={{ left: PAD + RING / 2 - 2 }}
        />
      )}

      <m.button
        type="button"
        disabled={locked}
        aria-describedby={locked ? hintId : undefined}
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{
          duration: 0.36,
          delay: Math.min(index, 6) * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={locked || reduced ? undefined : { y: -2 }}
        whileTap={locked || reduced ? undefined : { scale: 0.99 }}
        className={cn(
          "relative z-10 flex w-full items-center gap-4 rounded-2xl text-left",
          "transition-shadow duration-(--dur-fast)",
          locked
            ? "cursor-not-allowed bg-surface/60 ring-1 ring-border"
            : "cursor-pointer bg-surface shadow-sm ring-1 ring-border hover:shadow-md",
          state === "current" && "shadow-md ring-2 ring-accent",
        )}
        style={{ padding: PAD }}
      >
        <span
          aria-hidden="true"
          className={cn(
            "relative grid shrink-0 place-items-center rounded-full",
            state === "done" && "bg-mint text-white",
            state === "current" && "bg-accent text-on-accent",
            locked && "bg-surface-2 text-text-subtle ring-1 ring-border",
          )}
          style={{ width: RING, height: RING }}
        >
          {/* Sıradaki dersin etrafında yavaşça genişleyen halka: gözü
              buraya çekiyor, ekranda başka hiçbir şey dönmüyor. */}
          {state === "current" && !reduced ? (
            <span className="absolute inset-0 animate-node-pulse rounded-full bg-accent/40" />
          ) : null}

          {state === "done" ? (
            <Check className="relative size-6" strokeWidth={3} />
          ) : state === "current" ? (
            <Play className="relative size-5 translate-x-px" strokeWidth={2.75} fill="currentColor" />
          ) : (
            <Lock className="relative size-[18px]" strokeWidth={2} />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={cn(
              // Uzun başlık kesilmiyor, iki satıra sığıyor.
            "block text-[15px]/[1.35] font-semibold tracking-[-0.005em] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden",
              locked ? "text-text-subtle" : "text-text",
            )}
          >
            {title}
          </span>
          <span
            className={cn(
              "mt-0.5 block text-[12.5px] font-medium",
              state === "done" && "text-mint-text",
              state === "current" && "text-accent-text",
              locked && "text-text-subtle",
            )}
          >
            {state === "done" ? labels.done : state === "current" ? labels.current : labels.locked}
          </span>
        </span>
      </m.button>

      {locked ? (
        <span id={hintId} className="sr-only">
          {labels.lockedHint}
        </span>
      ) : null}
    </li>
  );
}
