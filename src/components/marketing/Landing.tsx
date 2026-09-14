import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Coins,
  Footprints,
  MonitorPlay,
  RotateCcw,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CodePanel } from "@/components/marketing/CodePanel";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { getDictionary, type Locale } from "@/i18n";
import { route } from "@/lib/routes";

// İkonlar sözlükte durmaz, metin ile sıra bazlı eşleşir.
const HOW_ICONS: LucideIcon[] = [MonitorPlay, Terminal, RotateCcw];
const BUILD_ICONS: LucideIcon[] = [Footprints, Coins, Boxes];

export function Landing({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const signIn = route("signIn", locale);

  return (
    <>
      <SiteHeader locale={locale} />

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section className="px-safe relative overflow-hidden">
          {/* Tek bir yumuşak ışık kaynağı. Kaydırmayla hareket etmez, dikkat çalmaz. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-18rem] size-[46rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[120px]"
          />

          <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-muted">
                  <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                  {dict.hero.badge}
                </p>
              </Reveal>

              <Reveal index={1}>
                <h1 className="mt-6 text-balance text-[1.85rem]/[1.16] font-semibold tracking-[-0.03em] text-text sm:text-[2.5rem]/[1.1] xl:text-[2.85rem]/[1.08]">
                  {dict.hero.titleTop}
                  <br />
                  <span className="text-accent-text">{dict.hero.titleAccent}</span>
                </h1>
              </Reveal>

              <Reveal index={2}>
                <p className="mt-6 max-w-[34rem] text-[17px]/[1.65] text-text-muted sm:text-lg/[1.65]">
                  {dict.hero.body}
                </p>
              </Reveal>

              <Reveal index={3}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button size="lg" asChild>
                    <Link href={signIn}>
                      {dict.hero.ctaPrimary}
                      <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                    <a href="#curriculum">{dict.hero.ctaSecondary}</a>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal index={2} className="lg:pl-4">
              <CodePanel check={dict.check} />
            </Reveal>
          </div>
        </section>

        {/* ---------- Nasıl işliyor ---------- */}
        <Section id="how" title={dict.how.title} lead={dict.how.lead}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {dict.how.items.map((step, i) => {
              const Icon = HOW_ICONS[i] ?? MonitorPlay;
              return (
                <Reveal key={step.title} index={i}>
                  <article className="h-full rounded-lg border border-border bg-surface p-6 transition-colors duration-(--dur-fast) hover:border-border-strong">
                    <Icon className="size-5 text-accent-text" strokeWidth={1.75} aria-hidden="true" />
                    <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-text">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px]/[1.65] text-text-muted">{step.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Section>

        {/* ---------- Ne yapacaksın ---------- */}
        <Section id="build" title={dict.build.title} lead={dict.build.lead}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {dict.build.items.map((item, i) => {
              const Icon = BUILD_ICONS[i] ?? Boxes;
              return (
                <Reveal key={item.title} index={i}>
                  <article className="group h-full overflow-hidden rounded-lg border border-border bg-surface transition-colors duration-(--dur-fast) hover:border-border-strong">
                    <div className="flex h-28 items-center justify-center border-b border-border bg-surface-2">
                      <Icon
                        className="size-8 text-text-muted transition-colors duration-(--dur-base) group-hover:text-accent-text"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-text">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-[14.5px]/[1.65] text-text-muted">{item.body}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Section>

        {/* ---------- Müfredat ---------- */}
        <Section id="curriculum" title={dict.curriculum.title} lead={dict.curriculum.lead}>
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {dict.curriculum.items.map((item, i) => (
              <li key={item.title} className="bg-surface">
                <Reveal index={i}>
                  <div className="flex gap-4 p-6">
                    <span className="font-mono text-[13px] font-medium text-accent-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-text">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px]/[1.65] text-text-muted">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>

        {/* ---------- Kapanış ---------- */}
        <section className="px-safe pb-28 pt-8 sm:pb-36">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-xl border border-border bg-surface px-6 py-14 text-center sm:px-10 sm:py-20">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-0 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]"
                />
                <div className="relative">
                  <h2 className="text-[1.75rem]/[1.15] font-semibold tracking-[-0.025em] text-text sm:text-4xl/[1.1]">
                    {dict.cta.title}
                  </h2>
                  <p className="mx-auto mt-4 max-w-[32rem] text-[15.5px]/[1.65] text-text-muted">
                    {dict.cta.body}
                  </p>
                  <div className="mt-8">
                    <Button size="lg" asChild>
                      <Link href={signIn}>
                        {dict.cta.button}
                        <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="px-safe pb-safe border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <span className="flex items-center gap-2 text-sm text-text-subtle">
            <LogoMark className="size-5" />
            {dict.meta.title}
          </span>
          <span className="text-center text-sm text-text-subtle sm:text-right">
            {dict.footer.trademark}
          </span>
        </div>
      </footer>
    </>
  );
}

function Section({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-safe scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <header className="mb-9 max-w-[38rem]">
            <h2 className="text-[1.6rem]/[1.2] font-semibold tracking-[-0.025em] text-text sm:text-[2rem]/[1.15]">
              {title}
            </h2>
            <p className="mt-3 text-[15.5px]/[1.65] text-text-muted">{lead}</p>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
