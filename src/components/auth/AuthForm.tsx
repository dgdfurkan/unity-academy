"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Wordmark } from "@/components/ui/Logo";
import { getDictionary, type Locale } from "@/i18n";
import { AuthError, auth, DEMO_ACCOUNTS } from "@/lib/auth";
import { homeFor, route } from "@/lib/routes";

type Errors = Partial<Record<"username" | "password" | "form", string>>;

export function SignInForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.auth;
  const router = useRouter();
  const { user, loading } = useAuth();

  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  // Giriş yapmış kullanıcı bu ekranda durmaz, rolüne göre yönlenir.
  useEffect(() => {
    if (!loading && user) router.replace(homeFor(user.role, locale));
  }, [loading, user, router, locale]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const found: Errors = {};
    if (!values.username.trim()) found.username = t.errors.usernameRequired;
    if (!values.password) found.password = t.errors.passwordRequired;
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setBusy(true);
    try {
      const signedIn = await auth.signIn(values.username, values.password);
      router.replace(homeFor(signedIn.role, locale));
    } catch (error) {
      setErrors({
        form: error instanceof AuthError ? t.errors[error.code] : t.errors.wrongCredentials,
      });
      setBusy(false);
    }
  }

  const set = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    // Kullanıcı düzeltmeye başlayınca hata kaybolur, yazarken azarlanmaz.
    setErrors((e) => ({ ...e, [key]: undefined, form: undefined }));
  };

  function fill(account: { username: string; password: string }) {
    setValues({ username: account.username, password: account.password });
    setErrors({});
  }

  return (
    <div className="px-safe pt-safe pb-safe flex min-h-dvh flex-col bg-bg">
      <header className="mx-auto flex h-16 w-full max-w-lg items-center justify-between px-5">
        <Link href={route("home", locale)} className="-mx-2 flex h-11 items-center rounded-md px-2">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-1">
          <LanguageSwitcher current={locale} label={dict.nav.switchLanguage} />
          <ThemeToggle labelToDark={dict.nav.themeToDark} labelToLight={dict.nav.themeToLight} />
        </div>
      </header>

      <main
        id="main"
        className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 py-10"
      >
        <div className="animate-rise">
          <h1 className="font-display text-[2rem]/[1.15] font-semibold tracking-[-0.02em] text-text">
            {t.signInTitle}
          </h1>
          <p className="mt-2 text-[15px]/[1.6] text-text-muted">{t.signInLead}</p>

          <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-4">
            <Field
              label={t.username}
              name="username"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              value={values.username}
              onChange={set("username")}
              error={errors.username}
            />

            <Field
              label={t.password}
              name="password"
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={set("password")}
              error={errors.password}
              revealLabels={{ show: t.showPassword, hide: t.hidePassword }}
            />

            {errors.form ? (
              <p
                role="alert"
                className="rounded-md bg-danger-surface px-3.5 py-3 text-[13px] text-danger"
              >
                {errors.form}
              </p>
            ) : null}

            <Button type="submit" size="lg" disabled={busy} className="mt-2 w-full">
              {busy ? t.working : t.submitSignIn}
            </Button>
          </form>

          <p className="mt-6 text-center text-[14px] text-text-muted">{t.noAccountNote}</p>

          {/* Sunucu bağlanana kadar deneme hesapları burada duruyor.
              Firebase geldiğinde bu blok silinecek. */}
          <section className="mt-8 rounded-2xl bg-surface p-4 shadow-sm">
            <h2 className="text-[13px] font-medium text-text">{t.demoTitle}</h2>
            <p className="mt-1 text-[13px]/[1.5] text-text-subtle">{t.demoBody}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <DemoButton
                label={t.demoStudent}
                account={DEMO_ACCOUNTS.student}
                onPick={fill}
              />
              <DemoButton
                label={t.demoInstructor}
                account={DEMO_ACCOUNTS.instructor}
                onPick={fill}
              />
            </div>
          </section>

          <p className="mt-4 flex gap-2.5 rounded-md border border-border bg-surface px-3.5 py-3 text-[13px]/[1.55] text-text-subtle">
            <Info className="mt-px size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            {t.notice}
          </p>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-lg px-5 pb-6">
        <Link
          href={route("home", locale)}
          className="inline-flex h-11 items-center gap-1.5 rounded-md text-[14px] text-text-subtle transition-colors duration-(--dur-instant) hover:text-text"
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
          {t.backHome}
        </Link>
      </footer>
    </div>
  );
}

function DemoButton({
  label,
  account,
  onPick,
}: {
  label: string;
  account: { username: string; password: string };
  onPick: (account: { username: string; password: string }) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPick(account)}
      className="flex h-11 cursor-pointer items-center gap-2 rounded-md border border-border bg-surface-2 px-3 text-[13px] transition-colors duration-(--dur-instant) hover:border-border-strong hover:bg-surface-3"
    >
      <span className="font-medium text-text">{label}</span>
      <span className="font-mono text-text-subtle">{account.username}</span>
    </button>
  );
}
