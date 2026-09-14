import { cn } from "@/lib/utils";

/**
 * Referanstaki kitap kapaklarının karşılığı: kursta yapılacak üç projenin
 * poster kapakları. Vektör oldukları için her ekranda net, iki temada da doğru.
 */
export type ProjectKey = "runner" | "idle" | "ad";

const GRADIENTS: Record<ProjectKey, [string, string]> = {
  runner: ["#3B2178", "#7C3AED"],
  idle: ["#7A3B0B", "#F5A623"],
  ad: ["#8C2418", "#F86D3B"],
};

export function ProjectCover({
  variant,
  className,
}: {
  variant: ProjectKey;
  className?: string;
}) {
  const [from, to] = GRADIENTS[variant];
  const gid = `cover-${variant}`;

  return (
    <svg
      viewBox="0 0 240 320"
      aria-hidden="true"
      className={cn("size-full", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="240" height="320" fill={`url(#${gid})`} />

      {variant === "runner" ? <Runner /> : variant === "idle" ? <Idle /> : <PlayableAd />}
    </svg>
  );
}

/* --------------------------- Endless runner --------------------------- */

function Runner() {
  return (
    <g>
      {/* Ufka giden şerit */}
      <path d="M120 120 208 320H32L120 120Z" fill="#ffffff" fillOpacity="0.1" />
      <path d="M120 120 150 320h-60L120 120Z" fill="#ffffff" fillOpacity="0.14" />
      {[170, 210, 258, 312].map((y, i) => (
        <rect
          key={y}
          x={120 - (3 + i * 1.6)}
          y={y}
          width={6 + i * 3.2}
          height={5 + i * 2}
          rx="2"
          fill="#ffffff"
          fillOpacity="0.5"
        />
      ))}

      {/* Engeller */}
      <rect x="58" y="238" width="30" height="30" rx="5" fill="#21C99A" />
      <rect x="160" y="212" width="24" height="24" rx="5" fill="#21C99A" fillOpacity="0.75" />

      {/* Zıplayan kapsül */}
      <g transform="translate(120 196)">
        <ellipse cx="0" cy="66" rx="20" ry="7" fill="#000" fillOpacity="0.22" />
        <rect x="-17" y="-34" width="34" height="68" rx="17" fill="#fff" />
        <circle cx="-6" cy="-10" r="3" fill="#2A1B4D" />
        <circle cx="7" cy="-10" r="3" fill="#2A1B4D" />
        <path d="M-6 2q6 5 12 0" stroke="#2A1B4D" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      </g>

      {/* Hız çizgileri */}
      <g stroke="#fff" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round">
        <path d="M22 150h30M14 172h20M28 194h34" />
      </g>

      {/* Yıldızlar */}
      <g fill="#FFC93C">
        <circle cx="196" cy="60" r="4" />
        <circle cx="46" cy="86" r="3" />
        <circle cx="166" cy="112" r="2.6" />
      </g>
    </g>
  );
}

/* ------------------------------- Idle -------------------------------- */

function Idle() {
  return (
    <g>
      {/* Yükselen üretim çubukları */}
      <g>
        {[
          [44, 210, 44],
          [82, 178, 76],
          [120, 146, 108],
          [158, 118, 136],
        ].map(([x, y, h]) => (
          <rect
            key={x}
            x={x}
            y={y}
            width="34"
            height={h}
            rx="8"
            fill="#fff"
            fillOpacity="0.18"
          />
        ))}
      </g>

      {/* Jeton yığını */}
      <g transform="translate(120 250)">
        {[0, -14, -28, -42].map((dy, i) => (
          <g key={dy} transform={`translate(0 ${dy})`}>
            <ellipse cx="0" cy="0" rx="42" ry="15" fill="#B45309" />
            <ellipse cx="0" cy="-5" rx="42" ry="15" fill="#FFC93C" />
            <ellipse cx="0" cy="-5" rx="20" ry="7" fill="#F5A623" fillOpacity={0.5 + i * 0.1} />
          </g>
        ))}
      </g>

      {/* Artış oku */}
      <g stroke="#21C99A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M46 110l38-34 32 26 46-52" />
        <path d="M144 50h20v20" />
      </g>
    </g>
  );
}

/* ---------------------------- Playable ad ---------------------------- */

function PlayableAd() {
  return (
    <g>
      {/* Telefon çerçevesi */}
      <g transform="translate(120 168)">
        <rect x="-58" y="-104" width="116" height="208" rx="20" fill="#2A1B4D" />
        <rect x="-50" y="-96" width="100" height="192" rx="14" fill="#fff" fillOpacity="0.95" />
        <rect x="-12" y="-100" width="24" height="7" rx="3.5" fill="#2A1B4D" />

        {/* Ekrandaki mini oyun */}
        <rect x="-50" y="34" width="100" height="62" rx="0" fill="#7C3AED" fillOpacity="0.22" />
        <rect x="-34" y="-4" width="28" height="28" rx="6" fill="#7C3AED" />
        <rect x="6" y="-32" width="28" height="56" rx="6" fill="#21C99A" />
        <circle cx="-20" cy="-52" r="12" fill="#FFC93C" />
      </g>

      {/* Dokunma işareti */}
      <g transform="translate(150 224)">
        <circle cx="0" cy="0" r="24" fill="#fff" fillOpacity="0.28" />
        <circle cx="0" cy="0" r="14" fill="#fff" fillOpacity="0.5" />
        <path
          d="M-4 -6v14l-7-4-3 5 12 10 14-4 4-14-4-4-5 3v-6a3.5 3.5 0 0 0-7 0Z"
          fill="#2A1B4D"
        />
      </g>
    </g>
  );
}
