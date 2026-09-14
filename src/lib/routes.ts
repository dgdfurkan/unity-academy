import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import type { Role } from "@/lib/auth/types";

/**
 * Yollar dile göre değişir: Türkçe kullanıcıya /sign-in göstermenin anlamı yok.
 * Tek kaynak burası. Dil değiştirici de bu tablodan ters arama yapıyor,
 * yoksa /giris sayfasından İngilizceye geçince var olmayan bir adrese düşerdi.
 */
export const ROUTES = {
  home: { tr: "/", en: "/" },
  signIn: { tr: "/giris", en: "/sign-in" },
  learn: { tr: "/ogren", en: "/learn" },
  progress: { tr: "/ilerleme", en: "/progress" },
  homework: { tr: "/odevler", en: "/homework" },
  profile: { tr: "/profil", en: "/profile" },
  students: { tr: "/yonetim", en: "/admin" },
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Anahtardan tam adrese. `en` için /en öneki eklenir. */
export function route(key: RouteKey, locale: Locale): string {
  const path = ROUTES[key][locale];
  const prefixed = locale === DEFAULT_LOCALE ? path : path === "/" ? "/en" : `/en${path}`;
  return prefixed.endsWith("/") ? prefixed : `${prefixed}/`;
}

/** Adresten anahtara. Bilinmeyen yolda null döner, çağıran ana sayfaya düşer. */
export function routeKeyOf(pathname: string): RouteKey | null {
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  const withoutLocale =
    trimmed === "/en" ? "/" : trimmed.startsWith("/en/") ? trimmed.slice(3) : trimmed;

  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    const paths = ROUTES[key];
    if (paths.tr === withoutLocale || paths.en === withoutLocale) return key;
  }

  // Alt yollar üst bölümün sekmesini aktif tutar: /ogren/m1-l1 → learn.
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    const paths = ROUTES[key];
    if (paths.tr === "/" ) continue;
    if (withoutLocale.startsWith(`${paths.tr}/`) || withoutLocale.startsWith(`${paths.en}/`)) {
      return key;
    }
  }
  return null;
}

/** Giriş sonrası varılacak ekran role göre değişir. */
export function homeFor(role: Role, locale: Locale): string {
  return route(role === "instructor" ? "students" : "learn", locale);
}
