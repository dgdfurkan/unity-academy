import { cn } from "@/lib/utils";

/**
 * Soyut izometrik hacim. Bir oyun motorunun uzamsal dünyasını anlatır,
 * hiçbir markanın işaretini taklit etmez.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-8", className)}
    >
      <path
        d="M16 3 28 9.7v12.6L16 29 4 22.3V9.7L16 3Z"
        className="fill-accent"
        fillOpacity="0.16"
      />
      <path
        d="M16 3 28 9.7v12.6L16 29 4 22.3V9.7L16 3Z"
        className="stroke-accent"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M16 3 28 9.7 16 16.4 4 9.7 16 3Z" className="fill-accent" />
      <path d="M16 16.4V29" className="stroke-accent" strokeWidth="1.8" />
      <circle cx="26" cy="7" r="3.4" className="fill-warm" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {/* Dar ekranda yazı görünmez ama erişilebilirlik ağacında kalır:
          display:none olsaydı bağlantı adsız kalırdı. */}
      <span className="sr-only font-display text-[19px] font-semibold tracking-[-0.02em] text-text sm:not-sr-only">
        Unity Academy
      </span>
    </span>
  );
}
