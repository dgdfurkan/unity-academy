"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy, Plus, Users, X } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { getDictionary, type Locale } from "@/i18n";
import { AuthError, students, USERNAME_PATTERN, type User } from "@/lib/auth";
import { readProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = { name: "", username: "", email: "", password: "" };

type FormErrors = Partial<Record<keyof typeof EMPTY_FORM | "form", string>>;

/** Okunur, elle yazılabilir geçici parola. Belirsiz karakterler (l, 1, O, 0) yok. */
function generatePassword(): string {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export function AdminStudents({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.admin;
  const { user } = useAuth();

  const [list, setList] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<{ user: User; password: string } | null>(null);

  const refresh = useCallback(() => setList(students.list()), []);
  useEffect(refresh, [refresh]);

  function openForm() {
    setForm({ ...EMPTY_FORM, password: generatePassword() });
    setErrors({});
    setCreated(null);
    setOpen(true);
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = t.errors.nameRequired;

    const username = form.username.trim().toLowerCase();
    if (!username) next.username = t.errors.usernameRequired;
    else if (!USERNAME_PATTERN.test(username)) next.username = t.errors.usernameInvalid;

    if (!form.email.trim()) next.email = t.errors.emailRequired;
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = t.errors.emailInvalid;

    if (form.password.length < 8) next.password = t.errors.passwordShort;
    return next;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setBusy(true);
    try {
      const student = await students.create(form);
      setCreated({ user: student, password: form.password });
      setOpen(false);
      refresh();
    } catch (error) {
      setErrors({
        form: error instanceof AuthError ? dict.auth.errors[error.code] : undefined,
      });
    } finally {
      setBusy(false);
    }
  }

  const set = (key: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, form: undefined }));
  };

  return (
    <div className="px-safe mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <PageHeader
        title={t.title}
        lead={t.lead}
        action={
          !open ? (
            <Button size="md" onClick={openForm} className="w-full sm:w-auto">
              <Plus className="size-4" strokeWidth={2.25} aria-hidden="true" />
              {t.newStudent}
            </Button>
          ) : null
        }
      />

      {/* ---------- Açılan hesabın bilgileri ---------- */}
      {created ? (
        <CreatedCard
          labels={t}
          student={created.user}
          password={created.password}
          onClose={() => setCreated(null)}
        />
      ) : null}

      {/* ---------- Yeni öğrenci formu ---------- */}
      {open ? (
        <section className="animate-rise mt-6 rounded-2xl bg-surface shadow-md p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-[19px] font-semibold tracking-[-0.015em] text-text">
                {t.newStudent}
              </h2>
              <p className="mt-1 text-[13.5px]/[1.55] text-text-muted">{t.newStudentLead}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.cancel}
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-md text-text-subtle transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-text"
            >
              <X className="size-[18px]" strokeWidth={1.75} />
            </button>
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              label={t.formName}
              name="name"
              autoComplete="off"
              value={form.name}
              onChange={set("name")}
              error={errors.name}
            />
            <Field
              label={t.formUsername}
              name="username"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              value={form.username}
              onChange={set("username")}
              hint={t.formUsernameHint}
              error={errors.username}
            />
            <Field
              label={t.formEmail}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="off"
              value={form.email}
              onChange={set("email")}
              error={errors.email}
            />

            <div className="flex items-start gap-2">
              <Field
                className="flex-1"
                label={t.formPassword}
                name="password"
                autoComplete="off"
                spellCheck={false}
                value={form.password}
                onChange={set("password")}
                error={errors.password}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => setForm((f) => ({ ...f, password: generatePassword() }))}
                className="mt-[26px] shrink-0"
              >
                {t.generate}
              </Button>
            </div>

            {errors.form ? (
              <p
                role="alert"
                className="rounded-md bg-danger-surface px-3.5 py-3 text-[13px] text-danger sm:col-span-2"
              >
                {errors.form}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2.5 sm:col-span-2">
              <Button type="submit" size="lg" disabled={busy}>
                {busy ? t.working : t.submit}
              </Button>
              <Button type="button" size="lg" variant="ghost" onClick={() => setOpen(false)}>
                {t.cancel}
              </Button>
            </div>
          </form>
        </section>
      ) : null}

      {/* ---------- Liste ---------- */}
      <section className="mt-8">
        <h2 className="text-[13px] font-medium uppercase tracking-wide text-text-subtle">
          {list.length} {t.listCount}
        </h2>

        {list.length === 0 ? (
          <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-14 text-center">
            <Users className="size-7 text-text-subtle" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-4 font-display text-[18px] font-semibold text-text">{t.emptyTitle}</h3>
            <p className="mt-1.5 max-w-[26rem] text-[14px]/[1.6] text-text-muted">{t.emptyBody}</p>
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-2.5">
            {list.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                locale={locale}
                labels={t}
                totalLessons={dict.curriculum.items.reduce((n, m) => n + m.lessons.length, 0)}
                isSelf={student.id === user?.id}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/* ------------------------------ parçalar ------------------------------ */

function StudentRow({
  student,
  locale,
  labels,
  totalLessons,
  isSelf,
}: {
  student: User;
  locale: Locale;
  labels: { colProgress: string; colXp: string; colJoined: string; lessonsShort: string };
  totalLessons: number;
  isSelf: boolean;
}) {
  // İlerleme tarayıcıda durduğu için yalnızca istemcide okunabiliyor.
  const [stats, setStats] = useState({ done: 0, xp: 0 });
  useEffect(() => {
    const p = readProgress(student.id);
    setStats({ done: p.completed.length, xp: p.xp });
  }, [student.id]);

  const pct = totalLessons > 0 ? Math.round((stats.done / totalLessons) * 100) : 0;

  return (
    <li
      className={cn(
        "rounded-2xl bg-surface shadow-sm p-4",
        isSelf && "border-accent/40",
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-[17px] font-semibold tracking-[-0.01em] text-text">{student.name}</h3>
        <p className="font-mono text-[13px] text-accent-text">{student.username}</p>
      </div>
      <p className="mt-0.5 truncate text-[13px] text-text-subtle">{student.email}</p>

      <dl className="mt-3.5 grid grid-cols-3 gap-3 text-[13px]">
        <div>
          <dt className="text-text-subtle">{labels.colProgress}</dt>
          <dd className="mt-0.5 tabular-nums text-text">
            {stats.done}/{totalLessons} {labels.lessonsShort}
          </dd>
        </div>
        <div>
          <dt className="text-text-subtle">{labels.colXp}</dt>
          <dd className="mt-0.5 tabular-nums text-text">{stats.xp}</dd>
        </div>
        <div>
          <dt className="text-text-subtle">{labels.colJoined}</dt>
          <dd className="mt-0.5 tabular-nums text-text">
            {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
              new Date(student.createdAt),
            )}
          </dd>
        </div>
      </dl>

      {/* Genişlik yerine scaleX: düzen hesabı tetiklenmiyor. */}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={student.name}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-3"
      >
        <div
          className="h-full origin-left rounded-full bg-accent transition-transform duration-(--dur-slow) ease-(--ease-out)"
          style={{ transform: `scaleX(${pct / 100})` }}
        />
      </div>
    </li>
  );
}

function CreatedCard({
  labels,
  student,
  password,
  onClose,
}: {
  labels: {
    createdTitle: string;
    createdBody: string;
    copy: string;
    copied: string;
    close: string;
    formUsername: string;
    formPassword: string;
  };
  student: User;
  password: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = `${labels.formUsername}: ${student.username}\n${labels.formPassword}: ${password}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Pano izni yoksa bilgiler zaten ekranda duruyor.
    }
  }

  return (
    <section className="animate-rise mt-6 rounded-xl border border-success/40 bg-success-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-2.5">
          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={2.5} aria-hidden="true" />
          <div>
            <h2 className="font-display text-[17px] font-semibold text-text">{labels.createdTitle}</h2>
            <p className="mt-1 text-[13.5px]/[1.55] text-text-muted">{labels.createdBody}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-md text-text-subtle transition-colors duration-(--dur-instant) hover:text-text"
        >
          <X className="size-[18px]" strokeWidth={1.75} />
        </button>
      </div>

      <dl className="mt-4 grid gap-2 rounded-md border border-border bg-surface p-3.5 font-mono text-[13.5px]">
        <div className="flex gap-2">
          <dt className="text-text-subtle">{labels.formUsername}:</dt>
          <dd className="text-text">{student.username}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-text-subtle">{labels.formPassword}:</dt>
          <dd className="text-text">{password}</dd>
        </div>
      </dl>

      <Button variant="secondary" onClick={copy} className="mt-3.5">
        {copied ? (
          <Check className="size-4" strokeWidth={2.25} aria-hidden="true" />
        ) : (
          <Copy className="size-4" strokeWidth={1.75} aria-hidden="true" />
        )}
        {copied ? labels.copied : labels.copy}
      </Button>
    </section>
  );
}
