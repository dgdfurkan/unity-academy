import { Slot } from "@/components/ui/Slot";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "ink";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover shadow-md hover:shadow-lg",
  secondary:
    "bg-surface text-text border border-border hover:border-border-strong hover:bg-surface-2 shadow-sm",
  ghost: "text-text-muted hover:bg-surface-2 hover:text-text",
  ink: "bg-ink text-on-ink hover:bg-ink-2",
};

// Dokunma hedefi her boyutta 44px'i tutar: sm'de görünen yükseklik 40px,
// eksik kısım görünmez bir alanla tamamlanır.
const SIZE: Record<Size, string> = {
  sm: "h-10 px-4 text-[13.5px] gap-2 before:absolute before:inset-x-0 before:-inset-y-0.5 before:content-['']",
  md: "h-12 px-5 text-[14.5px] gap-2.5",
  lg: "h-14 px-7 text-[15.5px] gap-3",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** Etiketi kendi elemanına devreder. Bağlantıyı buton gibi göstermek için. */
  asChild?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "relative inline-flex cursor-pointer select-none items-center justify-center",
        "rounded-full font-semibold whitespace-nowrap",
        "transition-[background-color,border-color,color,transform,box-shadow]",
        "duration-(--dur-fast) ease-(--ease-out)",
        "active:scale-[0.97] motion-reduce:active:scale-100",
        "disabled:pointer-events-none disabled:opacity-50",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...props}
    />
  );
}

/**
 * Referanstaki hap butonun içindeki yuvarlak ok rozeti. Butonun kendi
 * renginden ayrışıp eylemi işaret ediyor.
 */
export function ArrowBadge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "-mr-2.5 grid size-7 shrink-0 place-items-center rounded-full bg-warm text-white",
        "transition-transform duration-(--dur-fast) ease-(--ease-out)",
        "group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0",
        className,
      )}
    >
      {children}
    </span>
  );
}
