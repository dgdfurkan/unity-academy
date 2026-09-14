"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero'daki sayaçların yanındaki canlı işaretler. Rakamın ne anlattığını
 * gösteriyorlar: ders sayacında sayfalar sırayla diziliyor, proje sayacında
 * blok yerine oturup jeton fırlıyor.
 *
 * Döngü, yalnızca işaret ekrandayken çalışır: IntersectionObserver görünürlüğü
 * izliyor, dışarı çıkınca `animation-play-state: paused` devreye giriyor.
 * Hepsi transform ve opacity üzerinde.
 */
export type GlyphKind = "lessons" | "projects";

export function StatGlyph({ kind, className }: { kind: GlyphKind; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { rootMargin: "60px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      data-play={visible}
      aria-hidden="true"
      className={cn(
        "relative grid size-14 shrink-0 place-items-center rounded-full",
        kind === "lessons" ? "bg-sky/15" : "bg-mint/15",
        className,
      )}
    >
      <svg viewBox="0 0 48 48" fill="none" className="size-8 overflow-visible">
        {kind === "lessons" ? <Lessons /> : <Projects />}
      </svg>
    </span>
  );
}

/** Üst üste dizilen ders kartları. */
function Lessons() {
  return (
    <g>
      {[
        { y: 30, delay: "0s", fill: "var(--sky)", opacity: 0.35 },
        { y: 22, delay: "0.28s", fill: "var(--sky)", opacity: 0.6 },
        { y: 14, delay: "0.56s", fill: "var(--sky)", opacity: 1 },
      ].map((card) => (
        <rect
          key={card.y}
          x="8"
          y={card.y}
          width="32"
          height="9"
          rx="3.5"
          fill={card.fill}
          opacity={card.opacity}
          className="glyph-anim glyph-stack"
          style={{ animationDelay: card.delay }}
        />
      ))}
      {/* Tamamlanma tiki en üstteki kartın üzerinde belirir */}
      <g className="glyph-anim glyph-check" style={{ animationDelay: "0.9s" }}>
        <circle cx="36" cy="12" r="8" fill="var(--mint)" />
        <path
          d="M32.5 12l2.5 2.5 5-5"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

/** Yerine oturan blok ve fırlayan jeton. */
function Projects() {
  return (
    <g>
      {/* Zemin */}
      <rect x="6" y="34" width="36" height="6" rx="3" fill="var(--mint)" opacity="0.35" />

      {/* Oturan blok */}
      <g className="glyph-anim glyph-drop">
        <rect x="14" y="20" width="20" height="14" rx="4" fill="var(--mint)" />
        <rect x="14" y="20" width="20" height="5" rx="2.5" fill="#fff" opacity="0.35" />
      </g>

      {/* Fırlayan jeton */}
      <g className="glyph-anim glyph-pop" style={{ animationDelay: "0.55s" }}>
        <circle cx="34" cy="14" r="6" fill="var(--sun)" />
        <ellipse cx="34" cy="14" rx="2.2" ry="3.6" fill="var(--warm)" />
      </g>
    </g>
  );
}
