"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Play, Square } from "lucide-react";
import { SimFrame, SimResult } from "@/components/sim/SimFrame";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

const COPY = {
  tr: {
    label: "Mini Unity",
    inspector: "Inspector",
    speed: "speed",
    play: "Play",
    stop: "Stop",
    editMode: "Edit Mode",
    playMode: "Play Mode",
    idleNote: "Play'e bas, sonra Play sırasında speed değerini değiştirmeyi dene.",
    playingNote: "Play Mode'dasın. Değeri değiştir, küpün hızlandığını gör.",
    changedNote: "Değeri değiştirdin. Şimdi Stop'a bas ve ne olduğuna bak.",
    revertedNote: "Değer eski hâline döndü. Play sırasında yaptığın hiçbir değişiklik kaydedilmez.",
    savedNote: "Edit Mode'da değiştirdin. Bu değer sahneye yazıldı ve kalıcı.",
    done: "Aradaki farkı gördün: Play Mode geçici, Edit Mode kalıcı.",
  },
  en: {
    label: "Mini Unity",
    inspector: "Inspector",
    speed: "speed",
    play: "Play",
    stop: "Stop",
    editMode: "Edit Mode",
    playMode: "Play Mode",
    idleNote: "Press Play, then try changing speed while it is running.",
    playingNote: "You are in Play Mode. Change the value and watch the cube speed up.",
    changedNote: "You changed the value. Now press Stop and see what happens.",
    revertedNote: "The value snapped back. Nothing you change during Play is ever saved.",
    savedNote: "You changed it in Edit Mode. That value was written to the scene and it stays.",
    done: "You have seen the difference: Play Mode is temporary, Edit Mode is permanent.",
  },
} as const;

/**
 * Dersin en kritik cümlesini deneterek öğretiyor: "Play sırasında yaptığın
 * değişiklik kaybolur". Öğrenci Play'e basar, değeri değiştirir, küpün
 * hızlandığını görür, Stop'a basar ve değerin geri döndüğüne şahit olur.
 */
export function PlayModeSim({ locale, onSolved }: { locale: Locale; onSolved?: () => void }) {
  const t = COPY[locale];

  const [savedSpeed, setSavedSpeed] = useState(4);
  const [liveSpeed, setLiveSpeed] = useState(4);
  const [playing, setPlaying] = useState(false);
  const [changedInPlay, setChangedInPlay] = useState(false);
  const [reverted, setReverted] = useState(false);
  const [x, setX] = useState(0);
  const raf = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    if (!playing) {
      setX(0);
      last.current = 0;
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const step = (now: number) => {
      const dt = last.current ? Math.min((now - last.current) / 1000, 0.05) : 0;
      last.current = now;
      setX((current) => (current + liveSpeed * dt * 14) % 100);
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf.current);
      last.current = 0;
    };
  }, [playing, liveSpeed]);

  function start() {
    setPlaying(true);
    setReverted(false);
    setChangedInPlay(false);
    setLiveSpeed(savedSpeed);
  }

  function stop() {
    setPlaying(false);
    // Unity'nin yaptığı şey: sahnede kayıtlı değere geri dön.
    setLiveSpeed(savedSpeed);
    if (changedInPlay) {
      setReverted(true);
      onSolved?.();
    }
  }

  function changeSpeed(value: number) {
    if (playing) {
      setLiveSpeed(value);
      setChangedInPlay(true);
      setReverted(false);
    } else {
      setSavedSpeed(value);
      setLiveSpeed(value);
      setReverted(false);
    }
  }

  const note = reverted
    ? t.revertedNote
    : playing
      ? changedInPlay
        ? t.changedNote
        : t.playingNote
      : changedInPlay === false && savedSpeed !== 4
        ? t.savedNote
        : t.idleNote;

  return (
    <div className="flex flex-col gap-3">
      <SimFrame
        label={t.label}
        toolbar={
          <>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-wide",
                playing ? "bg-accent text-on-accent" : "bg-surface-3 text-text-subtle",
              )}
            >
              {playing ? t.playMode : t.editMode}
            </span>
            {playing ? (
              <Button size="sm" variant="secondary" onClick={stop}>
                <Square className="size-3.5" strokeWidth={3} aria-hidden="true" />
                {t.stop}
              </Button>
            ) : (
              <Button size="sm" onClick={start}>
                <Play className="size-3.5" strokeWidth={3} aria-hidden="true" />
                {t.play}
              </Button>
            )}
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div
            className={cn(
              "relative h-44 overflow-hidden rounded-xl bg-ink ring-2 transition-colors duration-(--dur-fast)",
              playing ? "ring-accent" : "ring-transparent",
            )}
          >
            <div className="absolute inset-x-0 bottom-0 h-8 bg-white/[0.08]" />
            <div
              className="absolute bottom-8 size-11 rounded-xl bg-warm shadow-lg"
              style={{ left: `calc(${x}% - 22px)`, willChange: "left" }}
            />
          </div>

          <div className="rounded-xl bg-surface-2 p-4">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-text-subtle">
              {t.inspector}
            </p>
            <label className="mt-3 block">
              <span className="font-mono text-[13px] text-text">{t.speed}</span>
              <input
                type="range"
                min={1}
                max={12}
                step={1}
                value={playing ? liveSpeed : savedSpeed}
                onChange={(e) => changeSpeed(Number(e.target.value))}
                className="mt-2 w-full accent-[var(--accent)]"
              />
              <span className="mt-1 block font-mono text-[20px] font-semibold text-text">
                {playing ? liveSpeed : savedSpeed}
              </span>
            </label>
          </div>
        </div>
      </SimFrame>

      <SimResult tone={reverted ? "good" : "info"}>
        {reverted ? (
          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
        ) : null}
        {note}
      </SimResult>

      {reverted ? <SimResult tone="good">{t.done}</SimResult> : null}
    </div>
  );
}
