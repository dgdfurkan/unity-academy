import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Wordmark } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getDictionary, type Locale } from "@/i18n";
import { route } from "@/lib/routes";

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const home = route("home", locale);

  const nav = [
    { href: "#how", label: dict.nav.how },
    { href: "#projects", label: dict.nav.build },
    { href: "#curriculum", label: dict.nav.curriculum },
  ];

  return (
    <header className="pt-safe px-safe sticky top-0 z-40 bg-bg/85 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4 border-b border-border">
          <Link
            href={home}
            className="-mx-2 flex h-11 items-center rounded-full px-2"
            aria-label={dict.nav.home}
          >
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label={dict.nav.home}>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex h-11 items-center rounded-full px-4 text-[14.5px] font-medium text-text-muted transition-colors duration-(--dur-instant) hover:bg-surface hover:text-text"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <LanguageSwitcher current={locale} label={dict.nav.switchLanguage} />
            <ThemeToggle labelToDark={dict.nav.themeToDark} labelToLight={dict.nav.themeToLight} />
            <Button size="sm" asChild className="ml-1">
              <Link href={route("signIn", locale)}>{dict.nav.signIn}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
