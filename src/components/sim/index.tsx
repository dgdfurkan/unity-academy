"use client";

import { ConsoleSim } from "@/components/sim/ConsoleSim";
import { DamageSim } from "@/components/sim/DamageSim";
import { EditorTourSim } from "@/components/sim/EditorTourSim";
import { EngineSplitSim } from "@/components/sim/EngineSplitSim";
import { HierarchyProjectSim } from "@/components/sim/HierarchyProjectSim";
import { PlayModeSim } from "@/components/sim/PlayModeSim";
import type { SimVariant } from "@/content/types";
import type { Locale } from "@/i18n";

/** Sürümden bileşene tek geçiş noktası. */
export function Sim({
  variant,
  locale,
  onSolved,
}: {
  variant: SimVariant;
  locale: Locale;
  onSolved?: () => void;
}) {
  switch (variant) {
    case "engine-split":
      return <EngineSplitSim locale={locale} onSolved={onSolved} />;
    case "play-mode":
      return <PlayModeSim locale={locale} onSolved={onSolved} />;
    case "editor-tour":
      return <EditorTourSim locale={locale} onSolved={onSolved} />;
    case "hierarchy-project":
      return <HierarchyProjectSim locale={locale} onSolved={onSolved} />;
    case "console":
      return <ConsoleSim locale={locale} onSolved={onSolved} />;
    case "damage":
      return <DamageSim locale={locale} onSolved={onSolved} />;
  }
}
