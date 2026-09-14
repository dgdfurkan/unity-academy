import { AppShell } from "@/components/app/AppShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import type { Locale } from "@/i18n";
import type { Role } from "@/lib/auth";
import type { ReactNode } from "react";

/** Girişi zorunlu kılan sayfaları tek yerden sarmalar. */
export function AppPage({
  locale,
  role,
  children,
}: {
  locale: Locale;
  /** Verilirse sayfa yalnızca bu role açılır. */
  role?: Role;
  children: ReactNode;
}) {
  return (
    <RequireAuth locale={locale} role={role}>
      <AppShell locale={locale}>{children}</AppShell>
    </RequireAuth>
  );
}
