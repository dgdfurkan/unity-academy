"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, ClipboardList, LogOut, TrendingUp, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { LogoMark, Wordmark } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getDictionary, type Locale } from "@/i18n";
import { auth } from "@/lib/auth";
import type { Role } from "@/lib/auth";
import { route, routeKeyOf, type RouteKey } from "@/lib/routes";
import { cn } from "@/lib/utils";

type NavItem = { key: RouteKey; icon: LucideIcon };

/** Gezinti role göre değişir: eğitmen ders ilerletmiyor, öğrenci hesap açmıyor. */
const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  student: [
    { key: "learn", icon: BookOpen },
    { key: "progress", icon: TrendingUp },
    { key: "homework", icon: ClipboardList },
    { key: "profile", icon: User },
  ],
  instructor: [
    { key: "students", icon: Users },
    { key: "profile", icon: User },
  ],
};

export function AppShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const activeKey = routeKeyOf(pathname);

  const role: Role = user?.role ?? "student";
  const nav = NAV_BY_ROLE[role];
  const home = route(role === "instructor" ? "students" : "learn", locale);

  const label = (key: RouteKey) =>
    key === "students" ? dict.admin.nav.students : dict.app.nav[key as keyof typeof dict.app.nav];

  async function signOut() {
    await auth.signOut();
    router.replace(route("home", locale));
  }

  return (
    <div className="min-h-dvh bg-bg">
      {/* --------- Masaüstü kenar çubuğu --------- */}
      <aside className="pl-safe fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-surface lg:flex">
        <div className="flex h-16 items-center px-5">
          <Link href={home} className="-mx-2 flex h-11 items-center rounded-md px-2">
            <Wordmark />
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-2" aria-label={dict.app.menu}>
          {nav.map(({ key, icon: Icon }) => (
            <Link
              key={key}
              href={route(key, locale)}
              aria-current={activeKey === key ? "page" : undefined}
              className={cn(
                "flex h-11 items-center gap-3 rounded-full px-4 text-[14.5px] font-medium",
                "transition-colors duration-(--dur-instant)",
                activeKey === key
                  ? "bg-accent-soft text-accent-text"
                  : "text-text-muted hover:bg-surface-2 hover:text-text",
              )}
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden="true" />
              {label(key)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-1 border-t border-border p-3">
          <div className="flex items-center gap-1 px-1 pb-1">
            <LanguageSwitcher current={locale} label={dict.nav.switchLanguage} />
            <ThemeToggle labelToDark={dict.nav.themeToDark} labelToLight={dict.nav.themeToLight} />
          </div>
          <button
            type="button"
            onClick={signOut}
            className="flex h-11 cursor-pointer items-center gap-3 rounded-full px-4 text-[14.5px] font-medium text-text-muted transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-text"
          >
            <LogOut className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden="true" />
            {dict.app.signOut}
          </button>
        </div>
      </aside>

      {/* --------- Telefon ve tablet üst çubuğu --------- */}
      <header className="pt-safe px-safe sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur-xl lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link
            href={home}
            aria-label={dict.nav.home}
            className="-mx-2 flex h-11 items-center rounded-md px-2"
          >
            <LogoMark className="size-7" />
          </Link>
          <div className="flex items-center gap-0.5">
            <LanguageSwitcher current={locale} label={dict.nav.switchLanguage} />
            <ThemeToggle labelToDark={dict.nav.themeToDark} labelToLight={dict.nav.themeToLight} />
            <button
              type="button"
              onClick={signOut}
              aria-label={dict.app.signOut}
              className="grid size-11 cursor-pointer place-items-center rounded-md text-text-muted transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-text"
            >
              <LogOut className="size-[18px]" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Alt çubuğun arkasına içerik girmesin diye taban boşluğu bırakılıyor. */}
      <main id="main" className="scroll-pb-nav pb-28 lg:ml-64 lg:pb-12">
        {children}
      </main>

      {/* --------- Telefon ve tablet alt gezintisi --------- */}
      <nav
        aria-label={dict.app.menu}
        className="pb-safe px-safe fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-lg items-stretch">
          {nav.map(({ key, icon: Icon }) => {
            const active = activeKey === key;
            return (
              <li key={key} className="flex-1">
                <Link
                  href={route(key, locale)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-16 flex-col items-center justify-center gap-1 rounded-2xl",
                    "transition-colors duration-(--dur-instant)",
                    active ? "text-accent-text" : "text-text-subtle hover:text-text",
                  )}
                >
                  <Icon
                    className="size-[22px]"
                    strokeWidth={active ? 2.15 : 1.75}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-medium">{label(key)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
