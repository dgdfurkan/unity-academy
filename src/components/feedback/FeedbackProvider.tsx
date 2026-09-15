"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Uygulama geneli geri bildirim katmanı: kutlama konfetisi, kısa bildirim
 * şeridi ve dokunma titreşimi. Referans prototipteki his bu üçünden geliyor.
 *
 * Hepsi `prefers-reduced-motion` tercihine saygılı: hareket kapalıysa konfeti
 * hiç üretilmez, bildirim yine görünür.
 */
type Feedback = {
  celebrate: (count?: number) => void;
  toast: (message: string) => void;
  buzz: (pattern?: number | number[]) => void;
};

const FeedbackContext = createContext<Feedback>({
  celebrate: () => {},
  toast: () => {},
  buzz: () => {},
});

const COLORS = ["#6d3bea", "#18b987", "#ffbd2e", "#ff6b37"];

type Piece = { id: number; left: number; dx: number; color: string; delay: number };

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const seq = useRef(0);
  const toastTimer = useRef<number>(0);

  const buzz = useCallback((pattern: number | number[] = 25) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  const celebrate = useCallback((count = 24) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const batch: Piece[] = Array.from({ length: count }, (_, i) => ({
      id: seq.current++,
      left: Math.random() * 100,
      dx: Math.random() * 220 - 110,
      color: COLORS[i % COLORS.length] ?? COLORS[0]!,
      delay: Math.random() * 0.35,
    }));
    setPieces((current) => [...current, ...batch]);
    const ids = new Set(batch.map((p) => p.id));
    window.setTimeout(() => {
      setPieces((current) => current.filter((p) => !ids.has(p.id)));
    }, 2200);
  }, []);

  const toast = useCallback((text: string) => {
    setMessage(text);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setMessage(null), 2200);
  }, []);

  // Dokunma dalgası: tek bir dinleyici bütün fiziksel yüzeyleri kapsıyor.
  // Her butona ayrı kod yazmak yerine olay yakalama ile çözülüyor.
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      const host = target?.closest<HTMLElement>("[data-wave]");
      if (!host) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = host.getBoundingClientRect();
      const wave = document.createElement("span");
      const size = Math.max(rect.width, rect.height) * 1.7;
      wave.className = "tap-wave";
      wave.style.width = `${size}px`;
      wave.style.height = `${size}px`;
      wave.style.left = `${event.clientX - rect.left}px`;
      wave.style.top = `${event.clientY - rect.top}px`;
      host.appendChild(wave);
      window.setTimeout(() => wave.remove(), 650);
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <FeedbackContext value={{ celebrate, toast, buzz }}>
      {children}

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-90 overflow-hidden">
        {pieces.map((piece) => (
          <i
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.left}vw`,
              background: piece.color,
              animationDelay: `${piece.delay}s`,
              ["--dx" as string]: `${piece.dx}px`,
            }}
          />
        ))}
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`pb-safe pr-safe pointer-events-none fixed bottom-24 right-0 z-100 px-4 transition-[opacity,transform] duration-(--dur-base) ease-(--ease-out) lg:bottom-6 ${
          message ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {message ? (
          <p className="solid-md rounded-2xl bg-ink px-4 py-3 text-[13.5px] font-semibold text-on-ink [--solid-shadow:#130923]">
            {message}
          </p>
        ) : null}
      </div>
    </FeedbackContext>
  );
}

export function useFeedback() {
  return useContext(FeedbackContext);
}
