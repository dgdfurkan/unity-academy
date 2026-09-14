import Link from "next/link";
import { ArrowLeft, Lock, PenLine } from "lucide-react";
import { AppPage } from "@/components/app/AppPage";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import { Button } from "@/components/ui/Button";
import { getLesson } from "@/content/lessons";
import { getDictionary, type Locale } from "@/i18n";
import { route } from "@/lib/routes";

/**
 * Bir dersin sayfası. Ders yazılmadıysa bunu gizlemiyoruz: boş bir oynatıcı
 * göstermek yerine durumu açıkça söyleyip yola geri dönüş veriyoruz.
 */
export function LessonRoute({ locale, id }: { locale: Locale; id: string }) {
  const lesson = getLesson(id);
  const t = getDictionary(locale).lesson;

  return (
    <AppPage locale={locale} role="student">
      {lesson ? (
        <LessonPlayer lesson={lesson} locale={locale} />
      ) : (
        <div className="px-safe mx-auto w-full max-w-lg py-16 text-center [--gx:1rem] sm:[--gx:1.5rem]">
          <span
            aria-hidden="true"
            className="mx-auto grid size-16 place-items-center rounded-full bg-surface-2 text-text-subtle"
          >
            <PenLine className="size-7" strokeWidth={1.8} />
          </span>
          <h1 className="mt-6 font-display text-[1.6rem]/[1.2] font-semibold tracking-[-0.02em] text-text">
            {t.comingSoonTitle}
          </h1>
          <p className="mx-auto mt-3 max-w-[26rem] text-[15px]/[1.65] text-text-muted">
            {t.comingSoonBody}
          </p>
          <Button size="lg" variant="secondary" asChild className="mt-8">
            <Link href={route("learn", locale)}>
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden="true" />
              {t.backToPath}
            </Link>
          </Button>
        </div>
      )}
    </AppPage>
  );
}

/** Kilitli derse doğrudan adresle girilirse gösterilir. */
export function LessonLocked({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).lesson;
  return (
    <div className="px-safe mx-auto w-full max-w-lg py-16 text-center [--gx:1rem] sm:[--gx:1.5rem]">
      <span
        aria-hidden="true"
        className="mx-auto grid size-16 place-items-center rounded-full bg-surface-2 text-text-subtle"
      >
        <Lock className="size-7" strokeWidth={1.8} />
      </span>
      <h1 className="mt-6 font-display text-[1.6rem]/[1.2] font-semibold tracking-[-0.02em] text-text">
        {t.lockedTitle}
      </h1>
      <p className="mx-auto mt-3 max-w-[26rem] text-[15px]/[1.65] text-text-muted">{t.lockedBody}</p>
      <Button size="lg" variant="secondary" asChild className="mt-8">
        <Link href={route("learn", locale)}>{t.backToPath}</Link>
      </Button>
    </div>
  );
}
