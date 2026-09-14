"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import type { Locale } from "@/i18n";
import type { Role } from "@/lib/auth";
import { homeFor, route } from "@/lib/routes";

/**
 * Statik sitede sunucu tarafı koruma yok, bu yalnızca yönlendirme.
 * Gerçek yetki kontrolü veriye erişirken yapılır: Firebase Security Rules.
 */
export function RequireAuth({
  locale,
  role,
  children,
}: {
  locale: Locale;
  /** Verilirse yalnızca bu roldeki kullanıcı geçer, diğeri kendi ekranına döner. */
  role?: Role;
  children: ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace(route("signIn", locale));
    else if (role && user.role !== role) router.replace(homeFor(user.role, locale));
  }, [loading, user, role, router, locale]);

  const allowed = user && (!role || user.role === role);

  if (loading || !allowed) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bg" aria-busy="true">
        <span className="size-5 animate-spin rounded-full border-2 border-border border-t-accent-text" />
      </div>
    );
  }

  return <>{children}</>;
}
