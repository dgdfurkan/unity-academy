"use client";

import { useState } from "react";
import { Check, RotateCcw, Trash2, TriangleAlert } from "lucide-react";
import { SimFrame, SimResult } from "@/components/sim/SimFrame";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

const COPY = {
  tr: {
    label: "Hierarchy ve Project",
    hierarchy: "Hierarchy · sahne",
    project: "Project · disk",
    prefab: "Enemy.prefab",
    instance: "Enemy",
    missing: "Missing Prefab",
    reset: "Baştan",
    start:
      "Soldaki örneklerden birini sil. Sonra sağdaki kalıbı silip ne olduğuna bak.",
    deletedInstance:
      "Bir örneği sildin. Sağdaki kalıp yerinde duruyor: sahneden nesne silmek diski etkilemez.",
    deletedPrefab:
      "Kalıbı sildin. Sahnedeki örnekler bozuldu ve Missing Prefab oldu. Bu yüzden Project'ten silmek geri dönüşü olmayan bir iştir.",
    done: "İkisini de denedin. Sahnedeki örnek ile diskteki kalıp ayrı şeyler.",
  },
  en: {
    label: "Hierarchy and Project",
    hierarchy: "Hierarchy · scene",
    project: "Project · disk",
    prefab: "Enemy.prefab",
    instance: "Enemy",
    missing: "Missing Prefab",
    reset: "Reset",
    start: "Delete one of the instances on the left, then delete the mould on the right.",
    deletedInstance:
      "You deleted an instance. The mould on the right is still there: removing an object from the scene does not touch disk.",
    deletedPrefab:
      "You deleted the mould. The instances in the scene broke and became Missing Prefab. That is why deleting from the Project has no easy way back.",
    done: "You tried both. An instance in the scene and a mould on disk are separate things.",
  },
} as const;

/**
 * Ders 02'nin çekirdek yanılgısını denetiyor: sahnedeki nesne ile diskteki
 * dosya aynı şey değil. Örneği silmek kalıbı etkilemiyor, kalıbı silmek bütün
 * örnekleri bozuyor.
 */
export function HierarchyProjectSim({
  locale,
  onSolved,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const t = COPY[locale];
  const [instances, setInstances] = useState([1, 2, 3]);
  const [prefabExists, setPrefabExists] = useState(true);
  const [did, setDid] = useState<Set<"instance" | "prefab">>(new Set());

  function mark(what: "instance" | "prefab") {
    const next = new Set(did);
    next.add(what);
    setDid(next);
    if (next.size === 2) onSolved?.();
  }

  function reset() {
    setInstances([1, 2, 3]);
    setPrefabExists(true);
  }

  const note = !prefabExists
    ? t.deletedPrefab
    : instances.length < 3
      ? t.deletedInstance
      : t.start;

  return (
    <div className="flex flex-col gap-3">
      <SimFrame
        label={t.label}
        toolbar={
          <Button size="sm" variant="ghost" onClick={reset}>
            <RotateCcw className="size-3.5" strokeWidth={2} aria-hidden="true" />
            {t.reset}
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
          {/* Sahne tarafı */}
          <div className="rounded-xl bg-surface-2 p-3">
            <p className="text-[11.5px] font-semibold uppercase tracking-wide text-text-subtle">
              {t.hierarchy}
            </p>
            <ul className="mt-2.5 flex flex-col gap-1.5">
              {instances.map((n) => (
                <li
                  key={n}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-lg px-3 py-2 ring-1",
                    prefabExists
                      ? "bg-surface text-text ring-border"
                      : "bg-danger-surface text-danger ring-danger",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2 font-mono text-[12.5px]">
                    {!prefabExists ? (
                      <TriangleAlert className="size-3.5 shrink-0" strokeWidth={2.4} aria-hidden="true" />
                    ) : null}
                    {prefabExists ? `${t.instance} (${n})` : t.missing}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setInstances((current) => current.filter((i) => i !== n));
                      mark("instance");
                    }}
                    aria-label={`${t.instance} ${n}`}
                    className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-text-subtle transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-danger"
                  >
                    <Trash2 className="size-3.5" strokeWidth={2} />
                  </button>
                </li>
              ))}
              {instances.length === 0 ? (
                <li className="rounded-lg bg-surface px-3 py-2 text-center font-mono text-[12px] text-text-subtle">
                  —
                </li>
              ) : null}
            </ul>
          </div>

          {/* Disk tarafı */}
          <div className="rounded-xl bg-surface-2 p-3">
            <p className="text-[11.5px] font-semibold uppercase tracking-wide text-text-subtle">
              {t.project}
            </p>
            <div className="mt-2.5">
              {prefabExists ? (
                <div className="flex items-center justify-between gap-2 rounded-lg bg-surface px-3 py-2 ring-1 ring-accent/40">
                  <span className="font-mono text-[12.5px] text-accent-text">{t.prefab}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPrefabExists(false);
                      mark("prefab");
                    }}
                    aria-label={t.prefab}
                    className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-text-subtle transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-danger"
                  >
                    <Trash2 className="size-3.5" strokeWidth={2} />
                  </button>
                </div>
              ) : (
                <p className="rounded-lg bg-surface px-3 py-2 text-center font-mono text-[12px] text-text-subtle">
                  —
                </p>
              )}
            </div>
          </div>
        </div>
      </SimFrame>

      <SimResult tone={did.size > 0 ? "good" : "info"}>{note}</SimResult>

      {did.size === 2 ? (
        <SimResult tone="good">
          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
          {t.done}
        </SimResult>
      ) : null}
    </div>
  );
}
