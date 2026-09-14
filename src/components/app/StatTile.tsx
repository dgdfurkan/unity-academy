"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Sayaç kartı. Öğren ve İlerleme ekranlarının ikisi de bunu kullanıyor;
 * önceden iki ekranda iki farklı biçim vardı ve aynı veri iki türlü görünüyordu.
 */

export type StatTone = "streak" | "points" | "review" | "lessons";

const TONE: Record<StatTone, { ring: string; icon: string; glow: string }> = {
  streak: { ring: "bg-sun/25", icon: "text-warm-text", glow: "bg-sun/35" },
  points: { ring: "bg-accent-soft", icon: "text-accent-text", glow: "bg-accent/30" },
  review: { ring: "bg-sky/15", icon: "text-sky-text", glow: "bg-sky/30" },
  lessons: { ring: "bg-mint/15", icon: "text-mint-text", glow: "bg-mint/30" },
};

/**
 * Sayı hedefe doğru sayarak çıkar. Bir kez çalışır, döngü değil.
 * `prefers-reduced-motion` açıkken doğrudan son değeri yazar.
 */
function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || target === 0) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // Hızlı başlayıp yumuşak duran eğri; sayaç sonunda yavaşlıyor.
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [target, durationMs]);

  return value;
}

export function StatTile({
  icon: Icon,
  tone,
  label,
  value,
  unit,
  suffix,
  className,
}: {
  icon: LucideIcon;
  tone: StatTone;
  label: string;
  value: number;
  /** Sayının yanına küçük punto ile gelir. */
  unit?: string;
  /** "/ 30" gibi sabit son ek. */
  suffix?: string;
  className?: string;
}) {
  const shown = useCountUp(value);
  const t = TONE[tone];

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2.5 overflow-hidden rounded-2xl bg-surface p-3.5 shadow-sm",
        "ring-1 ring-border transition-shadow duration-(--dur-base) hover:shadow-md",
        "sm:flex-row sm:items-center sm:gap-3.5 sm:p-4",
        className,
      )}
    >
      {/* İkonun arkasındaki yumuşak ışık; kartı düz bir kutu olmaktan çıkarıyor. */}
      <span
        aria-hidden="true"
        className={cn("pointer-events-none absolute -left-6 -top-8 size-24 rounded-full blur-2xl", t.glow)}
      />

      <span
        aria-hidden="true"
        className={cn("relative grid size-10 shrink-0 place-items-center rounded-full sm:size-11", t.ring)}
      >
        <Icon className={cn("size-[18px] sm:size-5", t.icon)} strokeWidth={2.2} />
      </span>

      {/* Bir <dl> içinde duruyor: etiket <dt>, değer <dd> olmak zorunda,
          yoksa ekran okuyucu ikisini ilişkilendiremiyor. */}
      <div className="relative min-w-0">
        <dt className="truncate text-[12px] font-medium text-text-subtle sm:text-[12.5px]">
          {label}
        </dt>
        <dd className="font-display text-[20px] font-semibold leading-tight tracking-[-0.015em] text-text tabular-nums sm:text-[22px]">
          {shown}
          {suffix ? <span className="text-text-subtle"> {suffix}</span> : null}
          {unit ? (
            <span className="ml-1 font-sans text-[12px] font-medium text-text-subtle">{unit}</span>
          ) : null}
        </dd>
      </div>
    </div>
  );
}
