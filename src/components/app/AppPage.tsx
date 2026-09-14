import { AppShell } from "@/components/app/AppShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import type { Locale } from "@/i18n";
import type { ReactNode } from "react";

/** Girişi zorunlu kılan sayfaları tek yerden sarmalar. */
export function AppPage({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <RequireAuth locale={locale}>
      <AppShell locale={locale}>{children}</AppShell>
    </RequireAuth>
  );
}
