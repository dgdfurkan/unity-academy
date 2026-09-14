import { Slot } from "@/components/ui/Slot";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover " +
    "shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset,0_6px_16px_-8px_var(--accent)]",
  secondary:
    "bg-surface-2 text-text border border-border hover:bg-surface-3 hover:border-border-strong",
  ghost: "text-text-muted hover:text-text hover:bg-surface-2",
};

// Dokunma hedefi her boyutta 44px'i tutar: sm'de görünen yükseklik 36px,
// eksik 8px görünmez bir alanla tamamlanır.
const SIZE: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5 before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
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
        "rounded-md font-medium whitespace-nowrap",
        "transition-[background-color,border-color,color,transform,opacity]",
        "duration-(--dur-instant) ease-(--ease-out)",
        "active:scale-[0.98] motion-reduce:active:scale-100",
        "disabled:pointer-events-none disabled:opacity-50",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...props}
    />
  );
}
