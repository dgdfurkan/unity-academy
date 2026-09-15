"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Bütün simülasyonların ortak çerçevesi: başlık şeridi ve gövde. */
export function SimFrame({
  label,
  toolbar,
  children,
  className,
}: {
  label: string;
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-surface ring-1 ring-border", className)}>
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-2 px-4 py-2">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-text-subtle">{label}</p>
        {toolbar ? <div className="flex items-center gap-2">{toolbar}</div> : null}
      </div>
      {children}
    </div>
  );
}

/** Simülasyonun çıkardığı sonuç satırı. */
export function SimResult({ tone, children }: { tone: "info" | "good"; children: ReactNode }) {
  return (
    <p
      className={cn(
        "flex gap-2.5 rounded-2xl px-4 py-3 text-[13.5px]/[1.6]",
        tone === "good" ? "bg-success-surface text-text" : "bg-surface-2 text-text-muted",
      )}
    >
      {children}
    </p>
  );
}
