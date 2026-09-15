"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFeedback } from "@/components/feedback/FeedbackProvider";
import type { Activity } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type Props = {
  activity: Extract<Activity, { kind: "cable" }>;
  locale: Locale;
  onDone?: () => void;
};

const CABLE_COLORS = ["#6d3bea", "#18b987", "#ffbd2e", "#ff6b37", "#3da5f5"];

/**
 * Kablo tahtası. Soldaki görevi seç, sağdaki karşılığına tak; doğruysa iki ucu
 * birleştiren akan bir kablo çizilir.
 *
 * Kablolar SVG path olarak, portların gerçek konumundan hesaplanır. Bu yüzden
 * ekran boyutu değişince yeniden çizilmeleri gerekir; ResizeObserver bunu
 * dinliyor. Sürükleme yok: dokunmatikte kaydırmayla çakışıyor.
 */
export function CableBoard({ activity, locale, onDone }: Props) {
  const t = getDictionary(locale).lesson;
  const { buzz } = useFeedback();

  const boardRef = useRef<HTMLDivElement>(null);
  const portRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

  const [selected, setSelected] = useState<number | null>(null);
  // Seçim ayrıca ref'te tutuluyor: iki dokunuş aynı kare içinde gelirse
  // state henüz işlenmemiş oluyor ve seçim kaybolmuş gibi görünüyordu.
  const selectedRef = useRef<number | null>(null);
  const [matched, setMatched] = useState<Map<number, number>>(new Map());
  const [wrong, setWrong] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; tone: "idle" | "good" | "bad" }>({
    text: t.cableStart,
    tone: "idle",
  });
  const [paths, setPaths] = useState<{ d: string; color: string }[]>([]);

  // Sağ sütun karışık gelir, yoksa eşleştirme sıra ezberine dönüyor.
  const rightOrder = activity.pairs
    .map((_, i) => i)
    .sort((a, b) => ((a * 7919) % activity.pairs.length) - ((b * 7919) % activity.pairs.length));

  const drawCables = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;
    const box = board.getBoundingClientRect();

    const next: { d: string; color: string }[] = [];
    let index = 0;
    for (const [left, right] of matched) {
      const a = portRefs.current.get(`l-${left}`)?.getBoundingClientRect();
      const b = portRefs.current.get(`r-${right}`)?.getBoundingClientRect();
      if (!a || !b) continue;

      const x1 = a.left + a.width / 2 - box.left;
      const y1 = a.top + a.height / 2 - box.top;
      const x2 = b.left + b.width / 2 - box.left;
      const y2 = b.top + b.height / 2 - box.top;
      const curve = Math.max(50, (x2 - x1) * 0.5);

      next.push({
        d: `M ${x1} ${y1} C ${x1 + curve} ${y1}, ${x2 - curve} ${y2}, ${x2} ${y2}`,
        color: CABLE_COLORS[index % CABLE_COLORS.length] ?? CABLE_COLORS[0]!,
      });
      index++;
    }
    setPaths(next);
  }, [matched]);

  useLayoutEffect(drawCables, [drawCables]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const observer = new ResizeObserver(drawCables);
    observer.observe(board);
    window.addEventListener("resize", drawCables);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", drawCables);
    };
  }, [drawCables]);

  function pickLeft(index: number) {
    selectedRef.current = index;
    setSelected(index);
    setMessage({ text: t.cablePickRight, tone: "idle" });
  }

  function pickRight(rightIndex: number) {
    const current = selectedRef.current;
    if (current === null) {
      setMessage({ text: t.cablePickLeft, tone: "bad" });
      return;
    }
    if (current === rightIndex) {
      const next = new Map(matched);
      next.set(current, rightIndex);
      setMatched(next);
      selectedRef.current = null;
      setSelected(null);
      setWrong(null);
      setMessage({ text: t.cableGood, tone: "good" });
      buzz([15, 25, 25]);
      if (next.size === activity.pairs.length) onDone?.();
    } else {
      setWrong(rightIndex);
      setMessage({ text: t.cableBad, tone: "bad" });
      buzz([35, 45, 35]);
      window.setTimeout(() => setWrong(null), 600);
    }
  }

  const usedRight = new Set(matched.values());

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{activity.question[locale]}</p>

      <div
        ref={boardRef}
        className="relative mt-5 grid grid-cols-2 gap-x-10 gap-y-3 rounded-2xl bg-gradient-to-b from-surface to-surface-2 p-3 sm:gap-x-24 sm:p-5"
      >
        {/* Kablolar içeriğin altında, portların üstünde */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] size-full overflow-visible"
        >
          {paths.map((path, i) => (
            <path
              key={i}
              d={path.d}
              className="cable-flow"
              stroke={path.color}
              strokeWidth={5}
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </svg>

        {/* Sol sütun: görevler */}
        <ul className="relative z-[2] flex flex-col gap-2.5">
          {activity.pairs.map((pair, i) => {
            const isMatched = matched.has(i);
            return (
              <li key={pair.left[locale]}>
                <button
                  type="button"
                  data-wave=""
                  disabled={isMatched}
                  onClick={() => pickLeft(i)}
                  aria-pressed={selected === i}
                  className={cn(
                    "relative flex min-h-[4.25rem] w-full items-center gap-2.5 overflow-hidden rounded-2xl p-3 text-left",
                    "ring-1 transition-[transform,box-shadow,background-color] duration-(--dur-fast)",
                    isMatched
                      ? "bg-success-surface ring-mint"
                      : selected === i
                        ? "-translate-y-0.5 cursor-pointer bg-surface ring-2 ring-warm solid-sm [--solid-shadow:var(--surface-3)]"
                        : "cursor-pointer bg-surface ring-border solid-sm [--solid-shadow:var(--surface-3)] hover:-translate-y-0.5",
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px]/[1.35] font-semibold text-text">
                      {pair.left[locale]}
                    </span>
                  </span>
                  <span
                    ref={(el) => {
                      if (el) portRefs.current.set(`l-${i}`, el);
                    }}
                    aria-hidden="true"
                    className={cn(
                      "size-5 shrink-0 rounded-full border-4 transition-colors duration-(--dur-fast)",
                      isMatched ? "border-mint bg-mint/25" : "border-border-strong bg-surface-2",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Sağ sütun: pencereler */}
        <ul className="relative z-[2] flex flex-col gap-2.5">
          {rightOrder.map((rightIndex) => {
            const pair = activity.pairs[rightIndex];
            if (!pair) return null;
            const isUsed = usedRight.has(rightIndex);
            return (
              <li key={pair.right[locale]}>
                <button
                  type="button"
                  data-wave=""
                  disabled={isUsed}
                  onClick={() => pickRight(rightIndex)}
                  className={cn(
                    "relative flex min-h-[4.25rem] w-full items-center gap-2.5 overflow-hidden rounded-2xl p-3 text-left",
                    "ring-1 transition-[transform,box-shadow,background-color] duration-(--dur-fast)",
                    isUsed
                      ? "bg-success-surface ring-mint"
                      : wrong === rightIndex
                        ? "animate-shake bg-danger-surface ring-danger"
                        : "cursor-pointer bg-surface ring-border solid-sm [--solid-shadow:var(--surface-3)] hover:-translate-y-0.5",
                  )}
                >
                  <span
                    ref={(el) => {
                      if (el) portRefs.current.set(`r-${rightIndex}`, el);
                    }}
                    aria-hidden="true"
                    className={cn(
                      "size-5 shrink-0 rounded-full border-4 transition-colors duration-(--dur-fast)",
                      isUsed ? "border-mint bg-mint/25" : "border-border-strong bg-surface-2",
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px]/[1.35] font-semibold text-text">
                      {pair.right[locale]}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p
        className={cn(
          "mt-4 min-h-6 text-center text-[13.5px]",
          message.tone === "good" && "text-mint-text",
          message.tone === "bad" && "text-warm-text",
          message.tone === "idle" && "text-text-subtle",
        )}
        aria-live="polite"
      >
        {matched.size === activity.pairs.length ? activity.feedback[locale] : message.text}
      </p>
    </div>
  );
}
