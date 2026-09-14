export const LOCALES = ["tr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** Türkçe kökte servis edilir, İngilizce /en altında. Yönlendirme yok. */
export const DEFAULT_LOCALE: Locale = "tr";

export const LOCALE_LABEL: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
};

/**
 * `en` için /en öneki ekler, `tr` için yolu olduğu gibi bırakır.
 * Sonda eğik çizgi bırakılır: next.config'de `trailingSlash` açık, canonical ve
 * alternate etiketlerinin gerçek adresle birebir aynı olması gerekiyor.
 */
export function localeHref(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const prefixed = locale === DEFAULT_LOCALE ? clean : clean === "/" ? "/en" : `/en${clean}`;
  return prefixed.endsWith("/") ? prefixed : `${prefixed}/`;
}
