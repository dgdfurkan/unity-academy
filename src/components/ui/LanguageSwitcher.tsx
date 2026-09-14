"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/i18n";
import { route, routeKeyOf } from "@/lib/routes";

/**
 * İki dil için segmentli kontrol gereksiz: tek düğme diğer dile geçirir.
 * Böylece hedef her ekranda 44px kalıyor ve dar başlıkta yer kaplamıyor.
 */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const other = LOCALES.find((l) => l !== current) ?? current;
  // Yol dile göre değişiyor: /giris karşılığı /en/sign-in.
  const key = routeKeyOf(pathname) ?? "home";

  return (
    <Link
      href={route(key, other)}
      hrefLang={other}
      aria-label={label}
      className="grid size-11 place-items-center rounded-md text-xs font-semibold uppercase text-text-muted transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-text"
    >
      {other}
    </Link>
  );
}
