"use client";

import { ClipboardList } from "lucide-react";
import { getDictionary, type Locale } from "@/i18n";

export function HomeworkView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).homeworkPage;

  return (
    <div className="px-safe mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="font-display text-[1.7rem]/[1.15] font-semibold tracking-[-0.02em] text-text sm:text-[2.1rem]/[1.1]">
        {t.title}
      </h1>
      <p className="mt-2 text-[15px] text-text-muted">{t.lead}</p>

      <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-14 text-center">
        <ClipboardList className="size-7 text-text-subtle" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="mt-4 font-display text-[18px] font-semibold text-text">{t.emptyTitle}</h2>
        <p className="mt-1.5 max-w-[26rem] text-[14px]/[1.6] text-text-muted">{t.emptyBody}</p>
      </div>
    </div>
  );
}
