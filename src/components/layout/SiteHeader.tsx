import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Wordmark } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getDictionary, localeHref, type Locale } from "@/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const home = localeHref(locale);

  const nav = [
    { href: "#how", label: dict.nav.how },
    { href: "#build", label: dict.nav.build },
    { href: "#curriculum", label: dict.nav.curriculum },
  ];

  return (
    <header className="pt-safe px-safe sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* Dokunma hedefi 44px'i tutsun diye yükseklik veriliyor,
            negatif kenar boşluğu görsel hizayı bozmuyor. */}
        <Link
          href={home}
          className="-mx-2 flex h-11 items-center rounded-md px-2"
          aria-label={dict.nav.home}
        >
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={dict.nav.home}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex h-11 items-center rounded-md px-3 text-sm text-text-muted transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher current={locale} label={dict.nav.switchLanguage} />
          <ThemeToggle labelToDark={dict.nav.themeToDark} labelToLight={dict.nav.themeToLight} />
          <Button size="sm" asChild>
            <Link href={home}>{dict.nav.signIn}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
