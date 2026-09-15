"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { SimFrame, SimResult } from "@/components/sim/SimFrame";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type PanelKey = "scene" | "game" | "hierarchy" | "inspector" | "project" | "console";

const COPY = {
  tr: {
    label: "Unity editörü",
    start: "Bir pencereye dokun, ne işe yaradığını gör.",
    done: "Altı pencerenin de ne işe yaradığını gördün.",
    panels: {
      scene: { name: "Scene", note: "Sahneyi burada kurarsın. Nesneleri taşır, döndürür, yerleştirirsin." },
      game: { name: "Game", note: "Oyuncunun kameradan gördüğü görüntü. Sahneyi değil sonucu gösterir." },
      hierarchy: { name: "Hierarchy", note: "Bu sahnedeki nesnelerin listesi. Diskteki dosyalar burada değil." },
      inspector: { name: "Inspector", note: "Seçili olan nesnenin ayarları. Seçim değişince içerik de değişir." },
      project: { name: "Project", note: "Diskteki bütün varlıklar: modeller, sesler, script'ler, prefab'lar." },
      console: { name: "Console", note: "Motorun sana söyledikleri. Kırmızı satır bir şeyin çalışmadığını söyler." },
    },
  },
  en: {
    label: "The Unity editor",
    start: "Tap a window to see what it is for.",
    done: "You have seen what all six windows are for.",
    panels: {
      scene: { name: "Scene", note: "Where you build the scene. You move, rotate and place objects here." },
      game: { name: "Game", note: "What the player sees through the camera. It shows the result, not the setup." },
      hierarchy: { name: "Hierarchy", note: "The list of objects in this scene. Files on disk are not here." },
      inspector: { name: "Inspector", note: "Settings of the selected object. Change the selection and this changes too." },
      project: { name: "Project", note: "Every asset on disk: models, sounds, scripts, prefabs." },
      console: { name: "Console", note: "What the engine is telling you. A red line means something did not run." },
    },
  },
} as const;

/**
 * Editörün altı penceresini listeleyerek değil, tıklatarak öğretiyor.
 * Seçilen pencere aydınlanıyor, diğerleri soluyor, açıklama altında çıkıyor.
 */
export function EditorTourSim({ locale, onSolved }: { locale: Locale; onSolved?: () => void }) {
  const t = COPY[locale];
  const [active, setActive] = useState<PanelKey | null>(null);
  const [seen, setSeen] = useState<Set<PanelKey>>(new Set());

  function pick(key: PanelKey) {
    setActive(key);
    const next = new Set(seen);
    next.add(key);
    setSeen(next);
    if (next.size === 6) onSolved?.();
  }

  const panel = (key: PanelKey, className: string) => (
    <button
      key={key}
      type="button"
      onClick={() => pick(key)}
      aria-pressed={active === key}
      className={cn(
        "relative cursor-pointer rounded-lg p-2 text-left ring-1 transition-[opacity,box-shadow] duration-(--dur-fast)",
        active === key
          ? "bg-accent-soft ring-2 ring-accent"
          : active === null
            ? "bg-surface-2 ring-border hover:ring-border-strong"
            : "bg-surface-2 opacity-40 ring-border",
        className,
      )}
    >
      <span className="text-[11.5px] font-semibold text-text">{t.panels[key].name}</span>
      {seen.has(key) ? (
        <Check
          className="absolute right-1.5 top-1.5 size-3 text-success"
          strokeWidth={3.5}
          aria-hidden="true"
        />
      ) : null}
    </button>
  );

  return (
    <div className="flex flex-col gap-3">
      <SimFrame
        label={t.label}
        toolbar={
          <span className="font-mono text-[12px] text-text-subtle">{seen.size}/6</span>
        }
      >
        {/* Editör düzeni: solda Hierarchy, ortada Scene ve Game, sağda Inspector,
            altta Project ve Console. Gerçek yerleşimin sadeleştirilmiş hâli. */}
        <div className="grid h-56 grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)_minmax(0,1fr)] grid-rows-[minmax(0,2fr)_minmax(0,1fr)] gap-2 p-3">
          {panel("hierarchy", "row-span-1")}
          <div className="grid grid-cols-2 gap-2">
            {panel("scene", "")}
            {panel("game", "")}
          </div>
          {panel("inspector", "row-span-2")}
          {panel("project", "")}
          {panel("console", "")}
        </div>
      </SimFrame>

      <SimResult tone={active ? "good" : "info"}>
        {active ? t.panels[active].note : t.start}
      </SimResult>

      {seen.size === 6 ? (
        <SimResult tone="good">
          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
          {t.done}
        </SimResult>
      ) : null}
    </div>
  );
}
