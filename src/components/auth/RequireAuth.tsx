"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import type { Locale } from "@/i18n";
import { route } from "@/lib/routes";

/**
 * Statik sitede sunucu tarafı koruma yok, bu yalnızca yönlendirme.
 * Gerçek yetki kontrolü veriye erişirken yapılır: Firebase Security Rules.
 */
export function RequireAuth({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace(route("signIn", locale));
  }, [loading, user, router, locale]);

  if (loading || !user) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bg" aria-busy="true">
        <span className="size-5 animate-spin rounded-full border-2 border-border border-t-accent-text" />
        <span className="sr-only">…</span>
      </div>
    );
  }

  return <>{children}</>;
}
