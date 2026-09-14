import { cn } from "@/lib/utils";

/**
 * Referanstaki dairesel fotoğraf kesimlerinin karşılığı. Fotoğraf yerine
 * izometrik oyun sahnesi var: konuyu anlatan, lisans derdi olmayan, her
 * çözünürlükte net bir vektör.
 *
 * Renkler bilinçli olarak temadan bağımsız: sahne her iki temada da doygun
 * renkli bir dairenin üstünde duruyor, token'a bağlanınca koyu temada
 * çamurlaşıyordu.
 */

const INK = "#2A1B4D";
const W = 46;
const H = 23;

/** Izgara koordinatını ekran koordinatına çevirir. z yukarı doğru yükseklik. */
function iso(x: number, y: number, z = 0): [number, number] {
  return [(x - y) * (W / 2), (x + y) * (H / 2) - z];
}

function tilePath(x: number, y: number): string {
  const [cx, cy] = iso(x, y);
  return `M${cx} ${cy - H / 2}L${cx + W / 2} ${cy}L${cx} ${cy + H / 2}L${cx - W / 2} ${cy}Z`;
}

function Cube({ x, y, h, color }: { x: number; y: number; h: number; color: string }) {
  const [cx, cy] = iso(x, y);
  const t = cy - h;
  return (
    <g>
      <path
        d={`M${cx - W / 2} ${t}L${cx} ${t + H / 2}L${cx} ${cy + H / 2}L${cx - W / 2} ${cy}Z`}
        fill={color}
        fillOpacity="0.62"
      />
      <path
        d={`M${cx} ${t + H / 2}L${cx + W / 2} ${t}L${cx + W / 2} ${cy}L${cx} ${cy + H / 2}Z`}
        fill={color}
        fillOpacity="0.85"
      />
      <path
        d={`M${cx} ${t - H / 2}L${cx + W / 2} ${t}L${cx} ${t + H / 2}L${cx - W / 2} ${t}Z`}
        fill={color}
      />
    </g>
  );
}

/**
 * Kapsül karakter. Unity'de bir prototip tam olarak böyle başlar: bir capsule,
 * bir Rigidbody ve otuz satır kod.
 */
function Capsule({
  x,
  y,
  lift = 0,
  tilt = 0,
  accent,
}: {
  x: number;
  y: number;
  lift?: number;
  tilt?: number;
  accent: string;
}) {
  const [cx, cy] = iso(x, y, lift);
  return (
    <g>
      <ellipse cx={cx} cy={cy + lift + H / 2} rx="24" ry="9" fill={INK} fillOpacity="0.17" />
      <g transform={`rotate(${tilt} ${cx} ${cy})`}>
        <rect
          x={cx - 22}
          y={cy - 94}
          width="44"
          height="96"
          rx="22"
          fill="#FFFFFF"
          stroke={INK}
          strokeWidth="3.4"
        />
        {/* Vizör bandı: karaktere yön veriyor, yüz ifadesi taşımıyor */}
        <path
          d={`M${cx - 22} ${cy - 62}h44`}
          stroke={INK}
          strokeWidth="3.4"
          strokeOpacity="0.15"
        />
        <circle cx={cx - 7.5} cy={cy - 72} r="4" fill={INK} />
        <circle cx={cx + 7.5} cy={cy - 72} r="4" fill={INK} />
        <path
          d={`M${cx - 8} ${cy - 56}q8 7 16 0`}
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <rect x={cx - 22} y={cy - 26} width="44" height="16" rx="8" fill={accent} />
      </g>
    </g>
  );
}

const FLOOR: [number, number][] = [
  [0, 0], [1, 0], [2, 0], [3, 0],
  [0, 1], [1, 1], [2, 1], [3, 1],
  [0, 2], [1, 2], [2, 2], [3, 2],
  [0, 3], [1, 3], [2, 3], [3, 3],
];

function Floor() {
  return (
    <g>
      {FLOOR.map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={tilePath(x, y)}
          fill="#FFFFFF"
          fillOpacity={(x + y) % 2 === 0 ? 1 : 0.82}
          stroke={INK}
          strokeOpacity="0.16"
          strokeWidth="1.2"
        />
      ))}
    </g>
  );
}

type Variant = "scene" | "runner";

const CIRCLE: Record<Variant, string> = {
  scene: "var(--warm)",
  runner: "var(--sun)",
};

/**
 * @param variant `scene` sahne kurulumunu, `runner` hareket ve fiziği anlatır.
 */
export function SceneCutout({ variant, className }: { variant: Variant; className?: string }) {
  return (
    <div className={cn("relative aspect-square", className)}>
      {/* Renkli daire, tıpkı referanstaki gibi görselin arkasında durur ve
          karakterin başı dairenin üstünden taşar. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[20%] rounded-full"
        style={{ backgroundColor: CIRCLE[variant] }}
      />

      <svg
        viewBox="-112 -128 224 200"
        fill="none"
        aria-hidden="true"
        className="relative size-full overflow-visible"
      >
        {variant === "scene" ? (
          <>
            <Floor />
            <Cube x={3} y={0} h={30} color="#7C3AED" />
            <Cube x={0} y={3} h={46} color="#21C99A" />
            <Cube x={3} y={3} h={16} color="#FFC93C" />
            <Capsule x={1.4} y={1.4} accent="#7C3AED" />
            {/* Seçili nesnenin transform gizmo'su */}
            <g strokeWidth="3.2" strokeLinecap="round">
              <path d="M66 -30h30" stroke="#F86D3B" />
              <path d="M90 -35l7 5-7 5" stroke="#F86D3B" strokeLinejoin="round" />
              <path d="M66 -30v-30" stroke="#21C99A" />
              <path d="M61 -54l5-7 5 7" stroke="#21C99A" strokeLinejoin="round" />
            </g>
          </>
        ) : (
          <>
            <Floor />
            <Cube x={3} y={1} h={34} color="#7C3AED" />
            <Cube x={3} y={2} h={34} color="#7C3AED" />
            <Capsule x={0.5} y={1.3} lift={40} tilt={-8} accent="#F86D3B" />
            {/* Zıplama yörüngesi */}
            <path
              d="M-96 24C-84-52-38-78 8-52"
              stroke={INK}
              strokeOpacity="0.4"
              strokeWidth="2.6"
              strokeDasharray="5 8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Toplanabilir jeton */}
            <g>
              <circle cx="46" cy="-86" r="16" fill="#FFC93C" stroke={INK} strokeWidth="3" />
              <ellipse cx="46" cy="-86" rx="6.5" ry="10" fill="#F86D3B" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
