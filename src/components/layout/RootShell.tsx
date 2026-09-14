import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { getDictionary, type Locale } from "@/i18n";
import type { ReactNode } from "react";

// Derleme anında indirilip kendi sunucumuzdan servis edilir.
// Çalışma anında Google'a istek gitmez, düzen kayması olmaz.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/**
 * Tema, ilk boyamadan önce belirlenir. Bu betik olmadan koyu tema kullanıcısı
 * bir kare beyaz ekran görür.
 */
const THEME_SCRIPT = `(function(){try{
var s=localStorage.getItem("theme");
var t=s==="light"||s==="dark"?s:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
document.documentElement.dataset.theme=t;
}catch(e){document.documentElement.dataset.theme="dark";}})();`;

/**
 * Her dilin kendi root layout'u var, çünkü `lang` özniteliği statik HTML'de
 * doğru olmak zorunda. Ortak kabuk burada tutuluyor, iki yerde kopyalanmıyor.
 */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          {dict.nav.skipToContent}
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
