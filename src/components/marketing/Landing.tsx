import Link from "next/link";
import {
  ArrowRight,
  Check,
  Compass,
  Gauge,
  Layers,
  MonitorPlay,
  RotateCcw,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  CurvedArrow,
  EaseCurve,
  Gizmo,
  GridPatch,
  Raycast,
  Trajectory,
  WaveLines,
  WireCube,
  WireSphere,
} from "@/components/art/Doodles";
import { ProjectCover, type ProjectKey } from "@/components/art/ProjectCover";
import { SceneCutout } from "@/components/art/SceneCutout";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CodePanel } from "@/components/marketing/CodePanel";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowBadge, Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { getDictionary, type Locale } from "@/i18n";
import { route } from "@/lib/routes";

const HOW_ICONS: LucideIcon[] = [MonitorPlay, Terminal, RotateCcw];
const PROJECT_KEYS: ProjectKey[] = ["runner", "idle", "ad"];

export function Landing({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const signIn = route("signIn", locale);

  return (
    <>
      <SiteHeader locale={locale} />

      <main id="main">
        {/* ═══════════════════ Hero ═══════════════════ */}
        <section className="px-safe relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14">
          <WaveLines className="top-0 h-[420px] text-border" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-14rem] size-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
          />

          {/* Dekorlar: oyun motoru dili, çocuk çizgi filmi değil */}
          <WireSphere className="absolute left-[4%] top-[18%] hidden size-14 text-accent/55 lg:block" />
          <GridPatch className="absolute right-[3%] top-[12%] hidden w-24 text-accent/45 lg:block" />
          <Trajectory className="absolute bottom-[26%] left-[2%] hidden w-32 text-warm/60 xl:block" />
          <WireCube className="absolute bottom-[16%] right-[5%] hidden size-16 text-accent/45 lg:block" />
          <EaseCurve className="absolute right-[13%] top-[44%] hidden w-20 text-mint/65 xl:block" />
          <Raycast className="absolute left-[11%] top-[54%] hidden w-24 text-sky/60 xl:block" />

          <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
            {/* Başlık bloğu */}
            <Reveal>
              <div className="relative mx-auto max-w-[44rem] text-center">
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-6 hidden size-11 place-items-center rounded-full bg-warm text-white shadow-lg sm:grid lg:-right-10"
                >
                  <Gizmo className="size-7 text-white" />
                </span>
                <h1 className="font-display text-[2.15rem]/[1.1] font-semibold tracking-[-0.02em] text-text sm:text-[3.1rem]/[1.06] lg:text-[3.6rem]/[1.04]">
                  {dict.hero.titleTop}{" "}
                  <span className="text-accent-text">{dict.hero.titleAccent}</span>
                </h1>
              </div>
            </Reveal>

            <Reveal index={1}>
              <p className="mx-auto mt-6 w-fit rounded-full bg-surface px-5 py-2.5 text-center text-[14px] font-medium text-text-muted shadow-sm ring-1 ring-border">
                {dict.hero.note}
              </p>
            </Reveal>

            <Reveal index={2}>
              <div className="mt-7 flex justify-center">
                <Button size="lg" asChild className="group">
                  <Link href={signIn}>
                    {dict.hero.ctaPrimary}
                    <ArrowBadge>
                      <ArrowRight className="size-4" strokeWidth={2.5} />
                    </ArrowBadge>
                  </Link>
                </Button>
              </div>
            </Reveal>

            {/* Görseller ve açıklama: üç sütun, ortada metin */}
            <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:mt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-6">
              <Reveal index={3} className="order-2 lg:order-1">
                <div className="relative mx-auto max-w-[300px]">
                  <SceneCutout variant="scene" />
                  <FloatingBadge className="-left-2 top-[32%] text-sky-text">
                    <Compass className="size-5" strokeWidth={2} />
                  </FloatingBadge>
                  <FloatingBadge className="-right-1 bottom-[14%] text-mint-text">
                    <Layers className="size-5" strokeWidth={2} />
                  </FloatingBadge>
                </div>
              </Reveal>

              <div className="order-1 lg:order-2">
                <Reveal index={3}>
                  <p className="mx-auto max-w-[32rem] text-center text-[16px]/[1.7] text-text-muted sm:text-[17px]/[1.7]">
                    {dict.hero.body}
                  </p>
                </Reveal>

                <div className="relative mt-9 flex flex-col items-center gap-6 sm:flex-row sm:justify-center lg:flex-col lg:items-start lg:gap-7">
                  <CurvedArrow className="absolute left-[42%] top-[38%] hidden w-16 -rotate-6 text-border-strong lg:block" />
                  <Reveal index={4}>
                    <Stat
                      icon={Layers}
                      tone="sky"
                      value={dict.stats.lessons.value}
                      label={dict.stats.lessons.label}
                    />
                  </Reveal>
                  <Reveal index={5} className="lg:ml-14">
                    <Stat
                      icon={Gauge}
                      tone="mint"
                      value={dict.stats.projects.value}
                      label={dict.stats.projects.label}
                    />
                  </Reveal>
                </div>
              </div>

              <Reveal index={4} className="order-3">
                <div className="relative mx-auto max-w-[300px]">
                  <SceneCutout variant="runner" />
                  <FloatingBadge className="-right-2 top-[30%] text-warm-text">
                    <Gauge className="size-5" strokeWidth={2} />
                  </FloatingBadge>
                  <FloatingBadge className="-left-1 bottom-[16%] text-accent-text">
                    <Terminal className="size-5" strokeWidth={2} />
                  </FloatingBadge>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════ Koyu bant: nasıl işliyor ═══════════════════ */}
        <section id="how" className="px-safe scroll-mt-28 pb-8">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-10 sm:px-10 sm:py-12">
                <WaveLines className="top-0 h-full text-white/[0.06]" />
                <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:items-center lg:gap-10">
                  <div>
                    <h2 className="font-display text-[1.7rem]/[1.15] font-semibold tracking-[-0.02em] text-on-ink sm:text-[2rem]/[1.1]">
                      {dict.how.title}
                    </h2>
                    <p className="mt-3 max-w-[20rem] text-[14.5px]/[1.65] text-on-ink-muted">
                      {dict.how.lead}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:border-l lg:border-ink-border lg:pl-10">
                    {dict.how.items.map((step, i) => {
                      const Icon = HOW_ICONS[i] ?? MonitorPlay;
                      const featured = i === 1;
                      return (
                        <Reveal key={step.title} index={i}>
                          <article
                            className={cnTile(featured)}
                          >
                            <Icon
                              className={
                                featured
                                  ? "size-6 text-on-accent"
                                  : "size-6 text-accent-text"
                              }
                              strokeWidth={1.9}
                              aria-hidden="true"
                            />
                            <h3
                              className={`mt-4 text-[15.5px] font-semibold tracking-[-0.01em] ${
                                featured ? "text-on-accent" : "text-on-ink"
                              }`}
                            >
                              {step.title}
                            </h3>
                            <p
                              className={`mt-2 text-[13.5px]/[1.6] ${
                                featured ? "text-on-accent/80" : "text-on-ink-muted"
                              }`}
                            >
                              {step.body}
                            </p>
                          </article>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════ Projeler ═══════════════════ */}
        <Section id="projects" title={dict.build.title} lead={dict.build.lead} centered>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {dict.build.items.map((item, i) => (
              <Reveal key={item.title} index={i}>
                <article className="group h-full overflow-hidden rounded-2xl bg-surface shadow-md transition-[transform,box-shadow] duration-(--dur-base) ease-(--ease-out) hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0">
                  <div className="aspect-[3/4] overflow-hidden">
                    <ProjectCover variant={PROJECT_KEYS[i] ?? "runner"} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-[19px] font-semibold tracking-[-0.015em] text-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px]/[1.65] text-text-muted">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ═══════════════════ Neden böyle ═══════════════════ */}
        <section className="px-safe relative py-6 sm:py-10">
          <WireCube className="absolute left-[6%] top-[8%] hidden size-12 text-accent/25 xl:block" />
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <div>
                  <h2 className="font-display text-[1.75rem]/[1.15] font-semibold tracking-[-0.02em] text-text sm:text-[2.2rem]/[1.1]">
                    {dict.why.title}
                  </h2>
                  <p className="mt-3 max-w-[30rem] text-[15.5px]/[1.65] text-text-muted">
                    {dict.why.lead}
                  </p>
                  <ul className="mt-7 flex flex-col gap-3.5">
                    {dict.why.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-warm text-white"
                        >
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-[15px]/[1.6] text-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal index={1}>
                <div className="relative mx-auto max-w-[360px]">
                  <SceneCutout variant="runner" />
                  <FloatingBadge className="-left-2 top-[26%] text-mint-text">
                    <Check className="size-5" strokeWidth={2.5} />
                  </FloatingBadge>
                  <FloatingBadge className="-right-2 bottom-[18%] text-warm-text">
                    <Compass className="size-5" strokeWidth={2} />
                  </FloatingBadge>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════ Tarayıcıda çalıştır ═══════════════════ */}
        <section className="px-safe py-10 sm:py-14">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="grid grid-cols-1 overflow-hidden rounded-2xl shadow-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <div className="flex flex-col justify-center bg-warm px-7 py-10 sm:px-10 sm:py-12">
                  <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-[12.5px] font-semibold uppercase tracking-wide text-white">
                    {dict.practice.tag}
                  </span>
                  <h2 className="mt-4 font-display text-[1.7rem]/[1.15] font-semibold tracking-[-0.02em] text-white sm:text-[2.1rem]/[1.1]">
                    {dict.practice.title}
                  </h2>
                  <p className="mt-3.5 max-w-[26rem] text-[15px]/[1.7] text-white/90">
                    {dict.practice.body}
                  </p>
                </div>
                <div className="bg-ink p-5 sm:p-7">
                  <CodePanel check={dict.check} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════ Müfredat ═══════════════════ */}
        <Section id="curriculum" title={dict.curriculum.title} lead={dict.curriculum.lead}>
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {dict.curriculum.items.map((item, i) => (
              <li key={item.title}>
                <Reveal index={i}>
                  <article className="flex h-full gap-4 rounded-2xl bg-surface p-5 shadow-sm transition-shadow duration-(--dur-fast) hover:shadow-md">
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[13px] font-semibold text-accent-text"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[17px] font-semibold tracking-[-0.01em] text-text">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[14px]/[1.65] text-text-muted">{item.body}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>

        {/* ═══════════════════ Kapanış bandı ═══════════════════ */}
        <section className="px-safe pb-20 pt-6 sm:pb-28">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl bg-sun px-6 py-12 sm:px-12 sm:py-16">
                <WireSphere className="absolute right-[6%] top-[12%] hidden size-20 text-ink/20 sm:block" />
                <Trajectory className="absolute bottom-[10%] left-[4%] hidden w-36 text-ink/20 sm:block" />
                <div className="relative mx-auto max-w-[34rem] text-center">
                  <h2 className="font-display text-[1.9rem]/[1.12] font-semibold tracking-[-0.025em] text-ink sm:text-[2.6rem]/[1.08]">
                    {dict.band.title}
                  </h2>
                  <p className="mx-auto mt-4 max-w-[26rem] text-[15.5px]/[1.65] text-ink/75">
                    {dict.band.body}
                  </p>
                  <div className="mt-8 flex justify-center">
                    <Button size="lg" variant="ink" asChild className="group">
                      <Link href={signIn}>
                        {dict.band.button}
                        <ArrowBadge>
                          <ArrowRight className="size-4" strokeWidth={2.5} />
                        </ArrowBadge>
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
          <span className="flex items-center gap-2.5 text-[14px] text-text-subtle">
            <LogoMark className="size-6" />
            {dict.meta.title}
          </span>
          <span className="text-center text-[14px] text-text-subtle sm:text-right">
            {dict.footer.trademark}
          </span>
        </div>
      </footer>
    </>
  );
}

/* ------------------------------ parçalar ------------------------------ */

function cnTile(featured: boolean) {
  return [
    "h-full rounded-xl p-5 transition-colors duration-(--dur-fast)",
    featured
      ? "bg-accent shadow-lg"
      : "bg-white/[0.04] hover:bg-white/[0.08]",
  ].join(" ");
}

const TONE = {
  sky: "bg-sky/15 text-sky-text",
  mint: "bg-mint/15 text-mint-text",
} as const;

function Stat({
  icon: Icon,
  tone,
  value,
  label,
}: {
  icon: LucideIcon;
  tone: keyof typeof TONE;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3.5">
      <span
        aria-hidden="true"
        className={`grid size-12 shrink-0 place-items-center rounded-full ${TONE[tone]}`}
      >
        <Icon className="size-5" strokeWidth={2} />
      </span>
      <div>
        <p className="font-display text-[26px] font-semibold leading-none tracking-[-0.02em] text-text">
          {value}
        </p>
        <p className="mt-1.5 max-w-[12rem] text-[13.5px]/[1.45] text-text-muted">{label}</p>
      </div>
    </div>
  );
}

function FloatingBadge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute grid size-12 place-items-center rounded-full bg-surface shadow-lg ring-1 ring-border ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function Section({
  id,
  title,
  lead,
  centered = false,
  children,
}: {
  id?: string;
  title: string;
  lead: string;
  centered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-safe scroll-mt-28 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <header className={centered ? "mb-9 text-center" : "mb-9 max-w-[38rem]"}>
            <h2 className="font-display text-[1.75rem]/[1.15] font-semibold tracking-[-0.02em] text-text sm:text-[2.2rem]/[1.1]">
              {title}
            </h2>
            <p
              className={`mt-3 text-[15.5px]/[1.65] text-text-muted ${
                centered ? "mx-auto max-w-[34rem]" : ""
              }`}
            >
              {lead}
            </p>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
