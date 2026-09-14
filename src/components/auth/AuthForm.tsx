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
import { AuthError, auth } from "@/lib/auth";
import { route } from "@/lib/routes";

type Mode = "signIn" | "signUp";
type Errors = Partial<Record<"name" | "email" | "password" | "form", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthForm({ mode, locale }: { mode: Mode; locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.auth;
  const router = useRouter();
  const { user, loading } = useAuth();

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  const isSignUp = mode === "signUp";

  // Giriş yapmış kullanıcı bu ekranda durmaz.
  useEffect(() => {
    if (!loading && user) router.replace(route("learn", locale));
  }, [loading, user, router, locale]);

  function validate(): Errors {
    const next: Errors = {};
    if (isSignUp && !values.name.trim()) next.name = t.errors.nameRequired;
    if (!values.email.trim()) next.email = t.errors.emailRequired;
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = t.errors.emailInvalid;
    if (!values.password) next.password = t.errors.passwordRequired;
    else if (isSignUp && values.password.length < 8) next.password = t.errors.passwordShort;
    return next;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setBusy(true);
    try {
      if (isSignUp) await auth.signUp(values.name, values.email, values.password);
      else await auth.signIn(values.email, values.password);
      router.replace(route("learn", locale));
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

      <main id="main" className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 py-10">
        <div className="animate-rise">
          <h1 className="text-[1.75rem]/[1.2] font-semibold tracking-[-0.025em] text-text">
            {isSignUp ? t.signUpTitle : t.signInTitle}
          </h1>
          <p className="mt-2 text-[15px]/[1.6] text-text-muted">
            {isSignUp ? t.signUpLead : t.signInLead}
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-4">
            {isSignUp ? (
              <Field
                label={t.name}
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={set("name")}
                error={errors.name}
              />
            ) : null}

            <Field
              label={t.email}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={set("email")}
              error={errors.email}
            />

            <Field
              label={t.password}
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              value={values.password}
              onChange={set("password")}
              hint={isSignUp ? t.passwordHint : undefined}
              error={errors.password}
              revealLabels={{ show: t.showPassword, hide: t.hidePassword }}
            />

            {errors.form ? (
              <p role="alert" className="rounded-md bg-danger-surface px-3.5 py-3 text-[13px] text-danger">
                {errors.form}
              </p>
            ) : null}

            <Button type="submit" size="lg" disabled={busy} className="mt-2 w-full">
              {busy ? t.working : isSignUp ? t.submitSignUp : t.submitSignIn}
            </Button>
          </form>

          <p className="mt-6 text-center text-[14px] text-text-muted">
            {isSignUp ? t.hasAccount : t.noAccount}{" "}
            <Link
              href={route(isSignUp ? "signIn" : "signUp", locale)}
              className="rounded-sm font-medium text-accent-text underline-offset-4 hover:underline"
            >
              {isSignUp ? t.toSignIn : t.toSignUp}
            </Link>
          </p>

          {/* Sunucu bağlanana kadar bu ekranın ne yaptığını gizlemiyoruz. */}
          <p className="mt-8 flex gap-2.5 rounded-md border border-border bg-surface px-3.5 py-3 text-[13px]/[1.55] text-text-subtle">
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
