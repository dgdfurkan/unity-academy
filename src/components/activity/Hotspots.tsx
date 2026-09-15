"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { Activity } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

/** Şema üzerindeki noktaların konumları. Yüzde cinsinden. */
const LAYOUT: Record<string, Record<string, { x: number; y: number }>> = {
  editor: {
    scene: { x: 38, y: 32 },
    game: { x: 68, y: 32 },
    hierarchy: { x: 12, y: 40 },
    inspector: { x: 89, y: 46 },
    project: { x: 30, y: 82 },
    console: { x: 66, y: 82 },
  },
  gameobject: {
    transform: { x: 50, y: 18 },
    mesh: { x: 22, y: 55 },
    collider: { x: 50, y: 55 },
    script: { x: 78, y: 55 },
    name: { x: 50, y: 88 },
  },
  frame: {
    input: { x: 12, y: 50 },
    update: { x: 38, y: 50 },
    physics: { x: 62, y: 50 },
    render: { x: 88, y: 50 },
  },
};

/**
 * Etiketli şema turu. Noktalara dokunarak ilerliyor; doğru cevap aranmıyor.
 * Bir ekranı ya da yapıyı tanıtmak için soru sormaktan daha etkili.
 */
export function Hotspots({
  activity,
  locale,
  onDone,
}: {
  activity: Extract<Activity, { kind: "hotspot" }>;
  locale: Locale;
  onDone?: () => void;
}) {
  const t = getDictionary(locale).lesson;
  const [active, setActive] = useState<string | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const layout = LAYOUT[activity.diagram] ?? {};

  function pick(id: string) {
    setActive(id);
    setSeen((current) => {
      const next = new Set(current);
      next.add(id);
      if (next.size === activity.points.length) onDone?.();
      return next;
    });
  }

  const current = activity.points.find((p) => p.id === active);

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{activity.question[locale]}</p>
      <p className="mt-1.5 text-[13px] text-text-subtle">
        {t.hotspotHint} · {seen.size}/{activity.points.length}
      </p>

      <div className="relative mt-5 h-64 overflow-hidden rounded-2xl bg-ink sm:h-72">
        {/* Şemanın kaba çizimi */}
        <Diagram kind={activity.diagram} />

        {activity.points.map((point) => {
          const pos = layout[point.id];
          if (!pos) return null;
          const isActive = active === point.id;
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => pick(point.id)}
              aria-pressed={isActive}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={cn(
                "absolute grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full",
                "text-[12px] font-bold transition-[background-color,transform] duration-(--dur-fast)",
                isActive
                  ? "scale-110 bg-accent text-on-accent"
                  : seen.has(point.id)
                    ? "bg-mint text-white"
                    : "animate-node-pulse bg-surface text-accent-text ring-2 ring-accent",
              )}
            >
              {seen.has(point.id) && !isActive ? (
                <Check className="size-4" strokeWidth={3.2} aria-hidden="true" />
              ) : (
                point.label[locale].slice(0, 2)
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 min-h-20 rounded-2xl bg-surface-2 p-4">
        {current ? (
          <>
            <p className="text-[15px] font-semibold text-text">{current.label[locale]}</p>
            <p className="mt-1.5 text-[14px]/[1.6] text-text-muted">{current.note[locale]}</p>
          </>
        ) : (
          <p className="text-[14px] text-text-subtle">{t.hotspotEmpty}</p>
        )}
      </div>
    </div>
  );
}

function Diagram({ kind }: { kind: "editor" | "gameobject" | "frame" }) {
  if (kind === "editor") {
    return (
      <div className="grid h-full grid-cols-[1fr_2.2fr_1fr] grid-rows-[2fr_1fr] gap-2 p-3 opacity-40">
        <div className="rounded-lg bg-white/10" />
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white/10" />
          <div className="rounded-lg bg-white/10" />
        </div>
        <div className="row-span-2 rounded-lg bg-white/10" />
        <div className="rounded-lg bg-white/10" />
        <div className="rounded-lg bg-white/10" />
      </div>
    );
  }

  if (kind === "gameobject") {
    return (
      <div className="grid h-full place-items-center opacity-40">
        <div className="h-3/5 w-3/5 rounded-2xl border-2 border-dashed border-white/40" />
      </div>
    );
  }

  return (
    <div className="flex h-full items-center gap-2 px-6 opacity-40">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-16 flex-1 rounded-lg bg-white/10" />
      ))}
    </div>
  );
}
