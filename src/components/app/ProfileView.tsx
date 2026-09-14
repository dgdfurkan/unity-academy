"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PageHeader } from "@/components/app/PageHeader";
import { getDictionary, LOCALE_LABEL, type Locale } from "@/i18n";

export function ProfileView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.profilePage;
  const { user } = useAuth();

  return (
    <div className="px-safe mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <PageHeader title={t.title} />

      <section className="mt-6 rounded-2xl bg-surface shadow-md">
        <h2 className="border-b border-border px-5 py-3.5 text-[13px] font-medium uppercase tracking-wide text-text-subtle">
          {t.account}
        </h2>
        <dl className="divide-y divide-border">
          <Row label={t.name} value={user?.name ?? "—"} />
          <Row label={t.username} value={user?.username ?? "—"} />
          <Row label={t.email} value={user?.email ?? "—"} />
          <Row
            label={t.role}
            value={user?.role === "instructor" ? t.roleInstructor : t.roleStudent}
          />
        </dl>
      </section>

      <section className="mt-5 rounded-2xl bg-surface shadow-md">
        <h2 className="border-b border-border px-5 py-3.5 text-[13px] font-medium uppercase tracking-wide text-text-subtle">
          {t.preferences}
        </h2>
        <dl className="divide-y divide-border">
          <div className="flex items-center justify-between gap-4 px-5 py-3">
            <dt className="text-[14px] text-text-muted">{t.language}</dt>
            <dd className="flex items-center gap-2">
              <span className="text-[14px] text-text">{LOCALE_LABEL[locale]}</span>
              <LanguageSwitcher current={locale} label={dict.nav.switchLanguage} />
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 px-5 py-3">
            <dt className="text-[14px] text-text-muted">{t.theme}</dt>
            <dd>
              <ThemeToggle
                labelToDark={dict.nav.themeToDark}
                labelToLight={dict.nav.themeToLight}
              />
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3">
      <dt className="text-[14px] text-text-muted">{label}</dt>
      <dd className="truncate text-[14px] text-text">{value}</dd>
    </div>
  );
}
