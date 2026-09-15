"use client";

import { useState } from "react";
import { Check, Crosshair, RotateCcw } from "lucide-react";
import { SimFrame, SimResult } from "@/components/sim/SimFrame";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

const COPY = {
  tr: {
    label: "Hasar sahnesi",
    damage: "Mermi hasarı",
    health: "Can",
    type: "Hesap tipi",
    intMode: "int",
    floatMode: "float",
    fire: "Ateş et",
    reset: "Baştan",
    dead: "Düşman öldü",
    intNote:
      "int ile hesapladın. Ondalıklı hasar tam sayıya kesiliyor, bu yüzden düşman beklediğinden geç ölüyor.",
    floatNote: "float ile hesapladın. Ondalık kısım korunuyor, toplam hasar birebir tutuyor.",
    start: "Bir hasar değeri seç ve ateş et. Aynı değeri int ve float ile dene.",
    both: "İkisini de denedin. Aradaki farkı gördün: aynı mermi, farklı sonuç.",
  },
  en: {
    label: "Damage scene",
    damage: "Bullet damage",
    health: "Health",
    type: "Arithmetic",
    intMode: "int",
    floatMode: "float",
    fire: "Fire",
    reset: "Reset",
    dead: "Enemy down",
    intNote:
      "You used int. Fractional damage is truncated, so the enemy survives longer than you expected.",
    floatNote: "You used float. The fraction survives and the total damage adds up exactly.",
    start: "Pick a damage value and fire. Try the same value with int and with float.",
    both: "You tried both. Same bullet, different outcome.",
  },
} as const;

const MAX_HEALTH = 100;

/**
 * Kullanıcının istediği örnek: mermi gidiyor, düşmana çarpıyor, can azalıyor.
 * Amaç tamsayı bölmesini ve tip seçimini somutlaştırmak. Aynı hasar değeri
 * int ile farklı, float ile farklı sonuç veriyor ve fark can çubuğunda görünüyor.
 */
export function DamageSim({ locale, onSolved }: { locale: Locale; onSolved?: () => void }) {
  const t = COPY[locale];

  const [rawDamage, setRawDamage] = useState(12.5);
  const [mode, setMode] = useState<"int" | "float">("int");
  const [health, setHealth] = useState(MAX_HEALTH);
  const [shots, setShots] = useState(0);
  const [flying, setFlying] = useState(false);
  const [tried, setTried] = useState<Set<"int" | "float">>(new Set());

  // int modunda hasar tam sayıya kesilir; C#'taki (int) dönüşümünün aynısı.
  const applied = mode === "int" ? Math.trunc(rawDamage) : rawDamage;
  const dead = health <= 0;

  function fire() {
    if (dead || flying) return;
    setFlying(true);
    window.setTimeout(() => {
      setFlying(false);
      setHealth((h) => Math.max(Math.round((h - applied) * 100) / 100, 0));
      setShots((s) => s + 1);
      const next = new Set(tried);
      next.add(mode);
      setTried(next);
      if (next.size === 2) onSolved?.();
    }, 420);
  }

  function reset() {
    setHealth(MAX_HEALTH);
    setShots(0);
    setFlying(false);
  }

  const pct = health / MAX_HEALTH;

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
        {/* Sahne */}
        <div className="relative h-40 overflow-hidden bg-ink">
          <div className="absolute inset-x-0 bottom-0 h-8 bg-white/[0.08]" />

          {/* Nişancı */}
          <div className="absolute bottom-8 left-6 grid size-12 place-items-center rounded-xl bg-accent text-on-accent">
            <Crosshair className="size-5" strokeWidth={2.4} aria-hidden="true" />
          </div>

          {/* Mermi */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute bottom-[3.4rem] size-3 rounded-full bg-sun",
              flying ? "animate-bullet" : "opacity-0",
            )}
          />

          {/* Düşman ve can çubuğu */}
          <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-white/15">
              <div
                className={cn(
                  "h-full origin-left rounded-full transition-transform duration-(--dur-base) ease-(--ease-out)",
                  pct > 0.5 ? "bg-mint" : pct > 0.2 ? "bg-sun" : "bg-warm",
                )}
                style={{ transform: `scaleX(${pct})` }}
              />
            </div>
            <div
              className={cn(
                "grid size-14 place-items-center rounded-2xl text-[13px] font-semibold transition-opacity duration-(--dur-base)",
                dead ? "bg-white/10 text-on-ink-muted opacity-50" : "bg-warm text-white",
              )}
            >
              {dead ? "×" : health}
            </div>
          </div>

          {dead ? (
            <p className="absolute inset-x-0 top-5 text-center text-[13px] font-semibold text-on-ink">
              {t.dead} · {shots} {locale === "tr" ? "mermi" : "shots"}
            </p>
          ) : null}
        </div>

        {/* Kontroller */}
        <div className="grid grid-cols-1 gap-4 border-t border-border p-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[13px] font-medium text-text">{t.damage}</span>
            <input
              type="range"
              min={5}
              max={25}
              step={0.5}
              value={rawDamage}
              onChange={(e) => setRawDamage(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--accent)]"
            />
            <span className="mt-1 block font-mono text-[15px] text-text">
              {rawDamage.toFixed(1)}
              {mode === "int" ? (
                <span className="ml-2 text-text-subtle">→ {applied}</span>
              ) : (
                <span className="ml-2 text-text-subtle">→ {applied}f</span>
              )}
            </span>
          </label>

          <div>
            <span className="text-[13px] font-medium text-text">{t.type}</span>
            <div className="mt-2 flex gap-2">
              {(["int", "float"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  aria-pressed={mode === option}
                  className={cn(
                    "h-11 flex-1 cursor-pointer rounded-full font-mono text-[13px] ring-1 transition-colors duration-(--dur-instant)",
                    mode === option
                      ? "bg-accent text-on-accent ring-accent"
                      : "bg-surface text-text ring-border hover:ring-border-strong",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            <Button onClick={fire} disabled={dead || flying} className="mt-3 w-full">
              {t.fire}
            </Button>
          </div>
        </div>

        {/* Çalışan kod */}
        <pre className="overflow-x-auto border-t border-border bg-surface-2 px-4 py-3 font-mono text-[12.5px]/[1.7] text-text-muted">
          <code>
            {mode === "int"
              ? `int damage = (int)${rawDamage.toFixed(1)}f;   // ${applied}\nhealth -= damage;`
              : `float damage = ${rawDamage.toFixed(1)}f;\nhealth -= damage;`}
          </code>
        </pre>
      </SimFrame>

      <SimResult tone={shots > 0 ? "good" : "info"}>
        {shots === 0 ? t.start : mode === "int" ? t.intNote : t.floatNote}
      </SimResult>

      {tried.size === 2 ? (
        <SimResult tone="good">
          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
          {t.both}
        </SimResult>
      ) : null}
    </div>
  );
}
