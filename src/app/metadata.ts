import type { Metadata, Viewport } from "next";
import { getDictionary, localeHref, type Locale } from "@/i18n";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function localeMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return {
    title: { default: dict.meta.title, template: `%s · ${dict.meta.title}` },
    description: dict.meta.description,
    applicationName: dict.meta.title,
    manifest: `${basePath}/manifest.webmanifest`,
    appleWebApp: {
      capable: true,
      title: dict.meta.title,
      statusBarStyle: "black-translucent",
    },
    icons: {
      icon: `${basePath}/icons/icon.svg`,
      apple: `${basePath}/icons/apple-touch-icon.png`,
    },
    alternates: {
      canonical: `${basePath}${localeHref(locale)}`,
      languages: {
        tr: `${basePath}${localeHref("tr")}`,
        en: `${basePath}${localeHref("en")}`,
      },
    },
    formatDetection: { telephone: false },
  };
}

export const sharedViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Çentiğin altına da çizilsin, güvenli alanı biz yönetiyoruz.
  viewportFit: "cover",
  // Yakınlaştırmayı kapatmıyoruz, erişilebilirlik gereği.
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#171029" },
    { media: "(prefers-color-scheme: light)", color: "#f4f1fe" },
  ],
};
