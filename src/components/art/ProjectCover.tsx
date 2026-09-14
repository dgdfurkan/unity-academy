"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Kursta yapılacak üç projenin kapakları. Her biri o projenin mekaniğini
 * gösteriyor: koşucunun zemini akıyor, idle oyunun çarkı dönüp jeton üretiyor,
 * reklam oyununda parmak dokunup blok yerine oturuyor.
 *
 * Animasyon yalnızca kapak ekrandayken çalışır. Görünürlük IntersectionObserver
 * ile izleniyor, kart ekrandan çıkınca `animation-play-state: paused` devreye
 * giriyor: arka planda kare harcanmıyor.
 *
 * Hepsi transform ve opacity üzerinde, layout hesabı tetiklenmiyor.
 * `prefers-reduced-motion` açıkken global kural süreleri sıfırlıyor ve sahne
 * son karesinde duruyor.
 */
export type ProjectKey = "runner" | "idle" | "ad";

const GRADIENTS: Record<ProjectKey, [string, string, string]> = {
  runner: ["#180E33", "#3F1E7E", "#7C3AED"],
  idle: ["#5A2A05", "#B45309", "#F5A623"],
  ad: ["#5E1810", "#B3301B", "#F86D3B"],
};

export function ProjectCover({ variant, className }: { variant: ProjectKey; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { rootMargin: "80px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const [a, b, c] = GRADIENTS[variant];
  const id = `cv-${variant}`;

  return (
    <div ref={ref} data-play={visible} className={cn("size-full", className)}>
      <svg viewBox="0 0 240 320" aria-hidden="true" className="size-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor={a} />
            <stop offset="55%" stopColor={b} />
            <stop offset="100%" stopColor={c} />
          </linearGradient>
          <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
          </linearGradient>
          {variant === "runner" ? (
            <clipPath id={`${id}-road`}>
              <path d="M120 150 214 320H26L120 150Z" />
            </clipPath>
          ) : null}
        </defs>

        <rect width="240" height="320" fill={`url(#${id}-sky)`} />

        {variant === "runner" ? (
          <Runner id={id} />
        ) : variant === "idle" ? (
          <Idle />
        ) : (
          <PlayableAd />
        )}

        <rect width="240" height="320" fill={`url(#${id}-fade)`} />
      </svg>
    </div>
  );
}

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

/* ══════════════════════ Endless Runner ══════════════════════ */

function Runner({ id }: { id: string }) {
  return (
    <g>
      {/* Yıldızlar */}
      <g fill="#FFFFFF">
        {[
          [30, 42, 1.6],
          [66, 26, 1.1],
          [104, 54, 1.4],
          [152, 30, 1.2],
          [190, 62, 1.7],
          [214, 34, 1.1],
        ].map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity="0.75" />
        ))}
      </g>

      {/* Ay */}
      <circle cx="186" cy="52" r="20" fill="#FFC93C" opacity="0.95" />
      <circle cx="177" cy="46" r="20" fill={GRADIENTS.runner[0]} opacity="0.85" />

      {/* Uzak katman: yavaş kayan tepeler. Yakın katmandan yavaş olması
          derinlik hissini veriyor. */}
      <g className="cover-anim cover-scroll-far">
        {[0, 64, 128, 192, 256].map((x) => (
          <path
            key={x}
            d={`M${x - 10} 152 ${x + 16} 112 ${x + 40} 152Z`}
            fill="#FFFFFF"
            opacity="0.1"
          />
        ))}
      </g>
      <rect y="146" width="240" height="8" fill="#FFFFFF" opacity="0.14" />

      {/* Yol */}
      <path d="M120 150 214 320H26L120 150Z" fill="#000000" opacity="0.28" />
      <g clipPath={`url(#${id}-road)`}>
        <g className="cover-anim cover-scroll-near">
          {[-92, 0, 92, 184, 276, 368].map((y) => (
            <rect key={y} x="117" y={y + 150} width="6" height="40" rx="3" fill="#FFFFFF" opacity="0.4" />
          ))}
        </g>
      </g>
      {/* Yol kenarları */}
      <path d="M120 150 214 320" stroke="#FFC93C" strokeWidth="3" opacity="0.7" fill="none" />
      <path d="M120 150 26 320" stroke="#FFC93C" strokeWidth="3" opacity="0.7" fill="none" />

      {/* Engeller */}
      <g className="cover-anim cover-float" style={delay(0.4)}>
        <rect x="150" y="214" width="26" height="26" rx="6" fill="#21C99A" />
        <rect x="150" y="214" width="26" height="9" rx="4" fill="#FFFFFF" opacity="0.3" />
      </g>
      <g className="cover-anim cover-float" style={delay(1.1)}>
        <rect x="64" y="248" width="32" height="32" rx="7" fill="#21C99A" opacity="0.85" />
        <rect x="64" y="248" width="32" height="11" rx="5" fill="#FFFFFF" opacity="0.3" />
      </g>

      {/* Jetonlar */}
      <g className="cover-anim cover-float" style={delay(0.8)}>
        <circle cx="168" cy="168" r="8" fill="#FFC93C" />
        <ellipse cx="168" cy="168" rx="3" ry="5" fill="#F86D3B" />
      </g>
      <g className="cover-anim cover-float" style={delay(1.6)}>
        <circle cx="74" cy="184" r="7" fill="#FFC93C" opacity="0.9" />
      </g>

      {/* Koşucu. Altındaki koyu eliptik gölge, beyaz gövdeyi yol
          şeritlerinden ayırıyor. */}
      <g transform="translate(120 258)">
        <ellipse cx="0" cy="48" rx="34" ry="12" fill="#12082A" fillOpacity="0.45" />
        <g className="cover-anim cover-bob">
          <g className="cover-anim cover-squash">
            <rect x="-25" y="-52" width="50" height="98" rx="25" fill="#FFFFFF" stroke="#2A1B4D" strokeWidth="3" />
            <rect x="-25" y="10" width="50" height="20" rx="10" fill="#7C3AED" />
            <circle cx="-8.5" cy="-20" r="4.2" fill="#2A1B4D" />
            <circle cx="8.5" cy="-20" r="4.2" fill="#2A1B4D" />
            <path d="M-9 -5q9 7 18 0" stroke="#2A1B4D" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </g>

      {/* Hız çizgileri */}
      <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
        <path d="M16 196h26" strokeWidth="3.5" opacity="0.5" className="cover-anim cover-float" style={delay(0.2)} />
        <path d="M8 216h18" strokeWidth="3" opacity="0.38" className="cover-anim cover-float" style={delay(0.55)} />
        <path d="M200 204h26" strokeWidth="3.5" opacity="0.5" className="cover-anim cover-float" style={delay(0.35)} />
        <path d="M214 226h18" strokeWidth="3" opacity="0.38" className="cover-anim cover-float" style={delay(0.9)} />
      </g>
    </g>
  );
}

/* ══════════════════════════ Idle Game ══════════════════════════ */

function Idle() {
  return (
    <g>
      {/* Arka plandaki üretim çubukları */}
      <g>
        {[
          [26, 206, 40],
          [62, 176, 70],
          [98, 150, 96],
          [134, 124, 122],
          [170, 100, 146],
        ].map(([x, y, h], i) => (
          <rect
            key={x}
            x={x}
            y={y}
            width="26"
            height={h}
            rx="7"
            fill="#FFFFFF"
            opacity={0.1 + i * 0.03}
          />
        ))}
      </g>

      {/* Üretim makinesi: gövde, iki çark ve çıkış oluğu */}
      <g transform="translate(64 108)">
        <rect x="-44" y="-52" width="92" height="88" rx="16" fill="#3D1F04" />
        <rect x="-44" y="-52" width="92" height="20" rx="10" fill="#FFFFFF" opacity="0.12" />
        <rect x="-30" y="26" width="64" height="16" rx="8" fill="#8A4B08" />
        <g transform="translate(-14 -10)">
          <Gear className="cover-anim cover-spin" />
        </g>
        <g transform="translate(22 8) scale(0.66)">
          <Gear className="cover-anim cover-spin-rev" />
        </g>
      </g>

      {/* Yükselen kazanç etiketleri */}
      <g fill="#FFFFFF" fontFamily="system-ui" fontWeight="700" fontSize="15">
        <text x="132" y="146" opacity="0" className="cover-anim cover-rise">
          +24
        </text>
        <text x="176" y="170" opacity="0" className="cover-anim cover-rise" style={delay(0.9)}>
          +8
        </text>
        <text x="150" y="196" opacity="0" className="cover-anim cover-rise" style={delay(1.7)}>
          +36
        </text>
      </g>

      {/* Jeton yığını */}
      <g transform="translate(120 268)">
        {[0, -15, -30, -45, -60].map((dy, i) => (
          <g key={dy} transform={`translate(0 ${dy})`}>
            <ellipse cx="0" cy="0" rx="46" ry="16" fill="#8A4B08" />
            <ellipse cx="0" cy="-6" rx="46" ry="16" fill="#FFC93C" />
            <ellipse cx="0" cy="-6" rx="22" ry="7.5" fill="#F5A623" opacity={0.45 + i * 0.09} />
          </g>
        ))}
        {/* Yığının üstünden geçen parlama */}
        <ellipse
          cx="0"
          cy="-66"
          rx="46"
          ry="16"
          fill="#FFFFFF"
          opacity="0.18"
          className="cover-anim cover-sheen"
        />
      </g>

      {/* Artış oku */}
      <g stroke="#21C99A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M150 96l24-22 20 16 28-32" opacity="0.95" />
        <path d="M206 58h18v18" opacity="0.95" />
      </g>
    </g>
  );
}

function Gear({ className }: { className?: string }) {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <g className={className}>
      {teeth.map((angle) => (
        <rect
          key={angle}
          x="-4.5"
          y="-27"
          width="9"
          height="11"
          rx="2.5"
          fill="#FFC93C"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r="19" fill="#FFC93C" />
      <circle r="8" fill="#B45309" />
    </g>
  );
}

/* ═══════════════════════ Playable Ad ═══════════════════════ */

function PlayableAd() {
  return (
    <g>
      {/* Konfeti */}
      <g>
        {[
          [30, 40, "#FFC93C"],
          [206, 58, "#21C99A"],
          [46, 92, "#7C3AED"],
          [198, 120, "#FFC93C"],
          [24, 150, "#21C99A"],
        ].map(([x, y, fill], i) => (
          <rect
            key={`${x}-${y}`}
            x={x as number}
            y={y as number}
            width="8"
            height="8"
            rx="2.5"
            fill={fill as string}
            opacity="0.8"
            className="cover-anim cover-float"
            style={delay(i * 0.45)}
          />
        ))}
      </g>

      {/* Telefon */}
      <g transform="translate(120 158)">
        <rect x="-62" y="-116" width="124" height="232" rx="24" fill="#2A1B4D" />
        <rect x="-54" y="-108" width="108" height="216" rx="17" fill="#F4F1FE" />
        <rect x="-13" y="-112" width="26" height="7" rx="3.5" fill="#2A1B4D" opacity="0.5" />

        {/* Mini bulmaca: boşluk ve yerine oturan blok */}
        <rect x="-42" y="-84" width="84" height="112" rx="12" fill="#7C3AED" opacity="0.1" />
        <rect x="-34" y="-30" width="34" height="52" rx="8" fill="#21C99A" />
        <rect x="-34" y="-30" width="34" height="16" rx="8" fill="#FFFFFF" opacity="0.25" />
        <rect
          x="6"
          y="-64"
          width="34"
          height="86"
          rx="8"
          fill="#7C3AED"
          opacity="0.16"
          strokeDasharray="6 5"
          stroke="#7C3AED"
          strokeWidth="2.4"
          strokeOpacity="0.6"
        />
        <g className="cover-anim cover-drop">
          <rect x="6" y="-64" width="34" height="86" rx="8" fill="#7C3AED" />
          <rect x="6" y="-64" width="34" height="18" rx="8" fill="#FFFFFF" opacity="0.28" />
        </g>

        {/* Skor şeridi */}
        <rect x="-42" y="44" width="84" height="11" rx="5.5" fill="#E3DCFA" />
        <rect x="-42" y="44" width="54" height="11" rx="5.5" fill="#F86D3B" />

        {/* Oyna rozeti */}
        <g className="cover-anim cover-float" style={delay(0.3)}>
          <rect x="-30" y="70" width="60" height="24" rx="12" fill="#2A1B4D" />
          <path d="M-7 76l13 6-13 6Z" fill="#FFFFFF" />
        </g>
      </g>

      {/* Dokunan parmak ve açılan halka: bulmacanın tam üstünde */}
      <g transform="translate(142 172)">
        <circle
          r="26"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          opacity="0"
          className="cover-anim cover-ring"
        />
        <g className="cover-anim cover-tap">
          <circle r="16" fill="#FFFFFF" opacity="0.28" />
          <path
            d="M-5 -8v17l-9-5-4 6 15 13 17-5 5-17-5-5-6 4v-8a4.2 4.2 0 0 0-8 0Z"
            fill="#FFFFFF"
            stroke="#2A1B4D"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </g>
  );
}
