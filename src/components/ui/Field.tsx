"use client";

import { useId, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  hint?: string;
  error?: string;
  /** Parola alanında göster/gizle düğmesi çıkar. */
  revealLabels?: { show: string; hide: string };
};

/**
 * Etiket her zaman görünür. Placeholder'ı etiket yerine kullanmak, alan
 * dolunca etiketi yok ediyor ve kullanıcı ne yazdığını unutuyor.
 */
export function Field({
  label,
  hint,
  error,
  revealLabels,
  className,
  type = "text",
  ...props
}: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const [revealed, setRevealed] = useState(false);

  const isPassword = type === "password" && revealLabels;
  const inputType = isPassword && revealed ? "text" : type;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[13px] font-medium text-text">
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          id={id}
          type={inputType}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(hint && hintId, error && errorId) || undefined}
          className={cn(
            "h-11 w-full rounded-md border bg-surface-2 px-3.5 text-[15px] text-text",
            "transition-colors duration-(--dur-instant)",
            "placeholder:text-text-subtle",
            isPassword && "pr-12",
            error
              ? "border-danger"
              : "border-border-strong hover:border-text-subtle focus:border-accent",
          )}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? revealLabels.hide : revealLabels.show}
            className="absolute right-0 top-0 grid h-11 w-11 cursor-pointer place-items-center rounded-md text-text-subtle transition-colors duration-(--dur-instant) hover:text-text"
          >
            {revealed ? (
              <EyeOff className="size-[18px]" strokeWidth={1.75} />
            ) : (
              <Eye className="size-[18px]" strokeWidth={1.75} />
            )}
          </button>
        ) : null}
      </div>

      {/* Hata alanın hemen altında. Formun tepesinde toplanan hata listesi,
          kullanıcıyı hangi alana döneceğini bulmak zorunda bırakıyor. */}
      {error ? (
        <p id={errorId} className="text-[13px] text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-[13px] text-text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
