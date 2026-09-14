"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, localeHref, type Locale } from "@/i18n";

/** Mevcut yolu koruyarak dil değiştirir. /en öneki soyulur, sonra yeniden kurulur. */
function stripLocale(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  if (trimmed === "/en") return "/";
  return trimmed.startsWith("/en/") ? trimmed.slice(3) : trimmed;
}

/**
 * İki dil için segmentli kontrol gereksiz: tek düğme diğer dile geçirir.
 * Böylece hedef her ekranda 44px kalıyor ve dar başlıkta yer kaplamıyor.
 */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const other = LOCALES.find((l) => l !== current) ?? current;

  return (
    <Link
      href={localeHref(other, stripLocale(pathname))}
      hrefLang={other}
      aria-label={label}
      className="grid size-11 place-items-center rounded-md text-xs font-semibold uppercase text-text-muted transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-text"
    >
      {other}
    </Link>
  );
}
