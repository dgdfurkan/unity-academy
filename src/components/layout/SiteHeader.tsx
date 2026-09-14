import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Wordmark } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getDictionary, type Locale } from "@/i18n";
import { route } from "@/lib/routes";

/**
 * Üst çubuk sayfaya yapışık bir şerit değil, zeminin üstünde duran yuvarlak
 * bir panel. Kenarları köşeli olmadığı için sayfanın geri kalanındaki hap
 * butonlar ve yuvarlak kartlarla aynı dili konuşuyor.
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const home = route("home", locale);

  const nav = [
    { href: "#how", label: dict.nav.how },
    { href: "#projects", label: dict.nav.build },
    { href: "#curriculum", label: dict.nav.curriculum },
  ];

  return (
    <div className="pt-safe px-safe sticky top-0 z-40">
      <div className="mx-auto w-full max-w-6xl px-3 pt-3 sm:px-6 sm:pt-4">
        <header className="flex h-16 items-center justify-between gap-3 rounded-full bg-surface/80 pl-4 pr-2 shadow-lg ring-1 ring-border backdrop-blur-xl sm:h-[68px] sm:pl-6 sm:pr-3">
          <Link
            href={home}
            className="-ml-2 flex h-11 items-center rounded-full px-2"
            aria-label={dict.nav.home}
          >
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label={dict.nav.home}>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex h-11 items-center rounded-full px-4 text-[14.5px] font-medium text-text-muted transition-colors duration-(--dur-instant) hover:bg-accent-soft hover:text-accent-text"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <LanguageSwitcher current={locale} label={dict.nav.switchLanguage} />
            <ThemeToggle labelToDark={dict.nav.themeToDark} labelToLight={dict.nav.themeToLight} />
            <Button size="sm" asChild className="ml-1">
              <Link href={route("signIn", locale)}>{dict.nav.signIn}</Link>
            </Button>
          </div>
        </header>
      </div>
    </div>
  );
}
