"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Pause, Play, RotateCcw } from "lucide-react";
import { SimFrame, SimResult } from "@/components/sim/SimFrame";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type Systems = { render: boolean; physics: boolean; input: boolean; rules: boolean };

const COPY = {
  tr: {
    label: "Çalışan sahne",
    render: "Render",
    physics: "Fizik",
    input: "Girdi",
    rules: "Oyun kuralları",
    renderNote: "Sahne çizilmiyor. Her şey çalışıyor ama göremiyorsun.",
    physicsNote: "Yerçekimi durdu. Karakter havada asılı kaldı.",
    inputNote: "Dokunma okunmuyor. Zıpla düğmesi hiçbir şey yapmıyor.",
    rulesNote: "Jetonlar toplanıyor ama sayaç artmıyor. Bu senin yazdığın kuraldı.",
    allOn: "Dört sistem de açık. Oyun olması gerektiği gibi çalışıyor.",
    jump: "Zıpla",
    score: "Jeton",
    reset: "Hepsini aç",
    done: "Dördünü de bir kez kapattın. Üçü motorun işi, biri senin.",
  },
  en: {
    label: "Running scene",
    render: "Rendering",
    physics: "Physics",
    input: "Input",
    rules: "Game rules",
    renderNote: "The scene is not drawn. Everything still runs, you just cannot see it.",
    physicsNote: "Gravity stopped. The character hangs in the air.",
    inputNote: "Touch is not read. The jump button does nothing.",
    rulesNote: "Coins are collected but the counter does not move. That rule was yours to write.",
    allOn: "All four systems are on. The game runs the way it should.",
    jump: "Jump",
    score: "Coins",
    reset: "Turn all on",
    done: "You switched all four off once. Three of them belong to the engine, one to you.",
  },
} as const;

/**
 * Motorun işi ile senin işinin farkını anlatmak yerine gösteriyor.
 * Dört sistemi tek tek kapatıp neyin bozulduğunu izliyorsun. Kapanan
 * sistem gerçekten duruyor: render kapanınca sahne çizilmiyor, fizik
 * kapanınca karakter düşmüyor.
 */
export function EngineSplitSim({
  locale,
  onSolved,
}: {
  locale: Locale;
  onSolved?: () => void;
}) {
  const t = COPY[locale];
  const [sys, setSys] = useState<Systems>({ render: true, physics: true, input: true, rules: true });
  const [y, setY] = useState(0);
  const [vy, setVy] = useState(0);
  const [coins, setCoins] = useState(0);
  const [turnedOff, setTurnedOff] = useState<Set<keyof Systems>>(new Set());
  const raf = useRef(0);
  const last = useRef(0);

  // Basit bir fizik döngüsü. Fizik kapalıyken konum hiç güncellenmiyor.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const step = (now: number) => {
      const dt = last.current ? Math.min((now - last.current) / 1000, 0.05) : 0;
      last.current = now;

      if (sys.physics) {
        setVy((v) => {
          const nextV = v - 34 * dt;
          setY((py) => {
            const nextY = py + nextV * dt * 6;
            return nextY <= 0 ? 0 : nextY;
          });
          return nextV;
        });
      }
      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf.current);
      last.current = 0;
    };
  }, [sys.physics]);

  function toggle(key: keyof Systems) {
    const wasOn = sys[key];
    setSys({ ...sys, [key]: !wasOn });
    if (!wasOn) return;

    const next = new Set(turnedOff);
    next.add(key);
    setTurnedOff(next);
    if (next.size === 4) onSolved?.();
  }

  function jump() {
    if (!sys.input) return;
    setVy(9);
    setY((py) => Math.max(py, 0.1));
    if (sys.rules) setCoins((c) => c + 1);
  }

  const note = !sys.render
    ? t.renderNote
    : !sys.physics
      ? t.physicsNote
      : !sys.input
        ? t.inputNote
        : !sys.rules
          ? t.rulesNote
          : t.allOn;

  const allOn = sys.render && sys.physics && sys.input && sys.rules;

  return (
    <div className="flex flex-col gap-3">
      <SimFrame
        label={t.label}
        toolbar={
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSys({ render: true, physics: true, input: true, rules: true })}
          >
            <RotateCcw className="size-3.5" strokeWidth={2} aria-hidden="true" />
            {t.reset}
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          {/* Sahne */}
          <div className="relative h-52 overflow-hidden rounded-xl bg-ink">
            {sys.render ? (
              <>
                <div className="absolute inset-x-0 bottom-0 h-10 bg-white/[0.08]" />
                <div
                  className="absolute left-1/2 size-12 -translate-x-1/2 rounded-2xl bg-accent shadow-lg"
                  style={{ bottom: `${40 + y * 8}px`, willChange: "bottom" }}
                />
                <div className="absolute right-6 top-6 rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-on-ink">
                  {t.score}: {coins}
                </div>
              </>
            ) : (
              <p className="grid h-full place-items-center px-6 text-center text-[13px] text-on-ink-muted">
                {t.renderNote}
              </p>
            )}
          </div>

          {/* Sistem anahtarları */}
          <div className="flex flex-col gap-2">
            {(
              [
                ["render", t.render, "motor"],
                ["physics", t.physics, "motor"],
                ["input", t.input, "motor"],
                ["rules", t.rules, "sen"],
              ] as const
            ).map(([key, label, owner]) => (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                aria-pressed={sys[key]}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left ring-1 transition-colors duration-(--dur-fast)",
                  sys[key] ? "bg-surface ring-border" : "bg-surface-2 ring-border-strong",
                )}
              >
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-[14px] font-medium",
                      sys[key] ? "text-text" : "text-text-subtle line-through",
                    )}
                  >
                    {label}
                  </span>
                  <span
                    className={cn(
                      "text-[11.5px] font-semibold uppercase tracking-wide",
                      owner === "motor" ? "text-sky-text" : "text-warm-text",
                    )}
                  >
                    {owner}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full",
                    sys[key] ? "bg-mint text-white" : "bg-surface-3 text-text-subtle",
                  )}
                >
                  {sys[key] ? <Play className="size-3.5" strokeWidth={3} /> : <Pause className="size-3.5" strokeWidth={3} />}
                </span>
              </button>
            ))}

            <Button onClick={jump} disabled={!sys.input} className="mt-1">
              {t.jump}
            </Button>
          </div>
        </div>
      </SimFrame>

      <SimResult tone={allOn ? "info" : "good"}>{note}</SimResult>

      {turnedOff.size === 4 ? (
        <SimResult tone="good">
          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
          {t.done}
        </SimResult>
      ) : null}
    </div>
  );
}
