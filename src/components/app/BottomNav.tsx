"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type BottomNavItem = {
  key: string;
  href: string;
  label: string;
  icon: LucideIcon;
};

/**
 * Telefon ve tablet gezintisi. Aktif sekmenin arkasındaki hap, tıklanan
 * sekmeye kayarak gidiyor; sekmeler ayrı ayrı yanıp sönmüyor.
 *
 * Kaydırma `transform` ile yapılıyor, `left` ile değil: düzen hesabı
 * tetiklenmiyor ve hareket derleyicide kalıyor.
 */
export function BottomNav({
  items,
  activeKey,
  label,
}: {
  items: BottomNavItem[];
  activeKey: string | null;
  label: string;
}) {
  const activeIndex = Math.max(
    items.findIndex((item) => item.key === activeKey),
    0,
  );
  const count = items.length;

  return (
    <nav
      aria-label={label}
      className="pb-safe px-safe fixed inset-x-0 bottom-0 z-30 [--gb:0.75rem] [--gx:0.75rem] lg:hidden"
    >
      <div className="relative mx-auto max-w-lg rounded-full bg-surface/90 p-1.5 shadow-lg ring-1 ring-border backdrop-blur-xl">
        {/* Kayan gösterge */}
        <span
          aria-hidden="true"
          className="absolute inset-y-1.5 left-1.5 rounded-full bg-accent-soft transition-transform duration-(--dur-slow) ease-(--ease-soft) motion-reduce:transition-none"
          style={{
            width: `calc((100% - 0.75rem) / ${count})`,
            transform: `translate3d(calc(${activeIndex} * 100%), 0, 0)`,
          }}
        />

        <ul className="relative flex items-stretch">
          {items.map(({ key, href, label: itemLabel, icon: Icon }) => {
            const active = key === activeKey;
            return (
              <li key={key} className="flex-1">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex h-14 flex-col items-center justify-center gap-0.5 rounded-full",
                    "transition-colors duration-(--dur-fast)",
                    active ? "text-accent-text" : "text-text-subtle hover:text-text",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-[21px] transition-transform duration-(--dur-base) ease-(--ease-out)",
                      "motion-reduce:transition-none",
                      active ? "-translate-y-px scale-110" : "group-hover:scale-105",
                    )}
                    strokeWidth={active ? 2.3 : 1.85}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "text-[11px] transition-all duration-(--dur-fast)",
                      active ? "font-semibold" : "font-medium",
                    )}
                  >
                    {itemLabel}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
