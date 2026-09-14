import { cn } from "@/lib/utils";

/**
 * Referanstaki el çizimi gezegen ve UFO'ların karşılığı. Konu oyun motoru
 * olduğu için dil de oradan geliyor: wireframe hacimler, transform gizmo,
 * fizik yörüngesi, bezier eğrisi, snap ızgarası.
 *
 * Hepsi dekoratif. Anlam taşımıyorlar, bu yüzden erişilebilirlik ağacından
 * çıkarılıyorlar ve renkleri currentColor üzerinden geliyor.
 */
type DoodleProps = { className?: string };

// Konumlandırma çağırana bırakılıyor: bazıları akışın içinde kullanılıyor.
const base = "pointer-events-none select-none";

export function WireCube({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn(base, className)}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M32 6 56 19v26L32 58 8 45V19L32 6Z" />
      <path d="M32 6v26m0 0L8 19m24 13 24-13M32 32v26" strokeOpacity="0.55" />
    </svg>
  );
}

export function WireSphere({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn(base, className)}
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="32" cy="32" r="25" />
      <ellipse cx="32" cy="32" rx="25" ry="10" strokeOpacity="0.55" />
      <ellipse cx="32" cy="32" rx="10" ry="25" strokeOpacity="0.55" />
    </svg>
  );
}

/** Unity'nin transform gizmo'su: üç eksen, üç ok. */
export function Gizmo({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={cn(base, className)}>
      <g strokeWidth="2.2" strokeLinecap="round">
        <path d="M30 34H56" stroke="var(--warm)" />
        <path d="M52 30l5 4-5 4" stroke="var(--warm)" strokeLinejoin="round" />
        <path d="M30 34V8" stroke="var(--mint)" />
        <path d="M26 12l4-5 4 5" stroke="var(--mint)" strokeLinejoin="round" />
        <path d="M30 34 10 52" stroke="var(--sky)" />
        <path d="M16 51l-6 1 1-6" stroke="var(--sky)" strokeLinejoin="round" />
      </g>
      <circle cx="30" cy="34" r="3.2" fill="currentColor" />
    </svg>
  );
}

/** Rigidbody yörüngesi: atış eğrisi ve sekme. */
export function Trajectory({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 120 64"
      fill="none"
      aria-hidden="true"
      className={cn(base, className)}
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M6 58C14 20 40 6 60 30s26 30 54 12" strokeDasharray="4 6" strokeLinecap="round" />
      <circle cx="6" cy="58" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="60" cy="30" r="2.5" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="114" cy="42" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Animasyon eğrisi, DOTween ve easing dersleri için. */
export function EaseCurve({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 80 64"
      fill="none"
      aria-hidden="true"
      className={cn(base, className)}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M6 56C30 56 30 10 74 10" />
      <path d="M6 56l18-2M74 10l-16 4" strokeOpacity="0.45" />
      <circle cx="6" cy="56" r="3" fill="currentColor" stroke="none" />
      <circle cx="74" cy="10" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Sahne ızgarası parçası. */
export function GridPatch({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 80 48"
      fill="none"
      aria-hidden="true"
      className={cn(base, className)}
      stroke="currentColor"
      strokeWidth="1.3"
      strokeOpacity="0.75"
    >
      <path d="M2 34 40 46 78 34M2 22 40 34 78 22M2 10 40 22 78 10" />
      <path d="M2 10v24M21 16v24M40 22v24M59 16v24M78 10v24" strokeOpacity="0.4" />
    </svg>
  );
}

/** Raycast: kaynaktan çıkan ışın ve çarpma noktası. */
export function Raycast({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 96 48"
      fill="none"
      aria-hidden="true"
      className={cn(base, className)}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M6 24h62" strokeDasharray="5 5" />
      <path d="M6 16v16" />
      <circle cx="74" cy="24" r="6" />
      <path d="M74 12v-6M74 42v6M86 24h6M64 14l-4-4M84 34l4 4" strokeOpacity="0.55" />
    </svg>
  );
}

/** Referanstaki kavisli oklar. Bakışı bir yerden bir yere taşır. */
export function CurvedArrow({ className, flip = false }: DoodleProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 72 48"
      fill="none"
      aria-hidden="true"
      className={cn(base, flip && "-scale-x-100", className)}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10c26-10 50 2 62 28" />
      <path d="M58 30l8 9 3-11" />
    </svg>
  );
}

/** Arka plandaki yumuşak dalga çizgileri. */
export function WaveLines({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 1440 420"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 select-none", className)}
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M-20 74C220 14 420 138 700 96s520-120 780-36" />
      <path d="M-20 186C240 126 400 250 700 208s540-120 780-36" strokeOpacity="0.7" />
      <path d="M-20 302C260 242 380 366 700 324s560-120 780-36" strokeOpacity="0.45" />
    </svg>
  );
}
