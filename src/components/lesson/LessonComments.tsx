"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { getDictionary, type Locale } from "@/i18n";

type Comment = {
  id: string;
  lessonId: string;
  authorId: string;
  authorName: string;
  instructor: boolean;
  text: string;
  at: string;
};

const KEY = "ua.comments";

function read(lessonId: string): Comment[] {
  try {
    const raw = localStorage.getItem(KEY);
    const all = raw ? (JSON.parse(raw) as Comment[]) : [];
    return all
      .filter((c) => c.lessonId === lessonId)
      // Eğitmen cevabı üstte durur, gerisi eskiden yeniye.
      .sort((a, b) =>
        a.instructor === b.instructor ? a.at.localeCompare(b.at) : a.instructor ? -1 : 1,
      );
  } catch {
    return [];
  }
}

function writeAll(next: Comment[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // yazma engellendi, yorum bu oturumda kalır
  }
}

/**
 * Ders altı yorumlar. Şimdilik tarayıcıda tutuluyor ve bu açıkça yazılıyor;
 * Firebase bağlanınca `read`/`writeAll` Firestore'a taşınacak, bileşen aynı kalacak.
 */
export function LessonComments({ lessonId, locale }: { lessonId: string; locale: Locale }) {
  const t = getDictionary(locale).lesson.comments;
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => setComments(read(lessonId)), [lessonId]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !user) return;

    const comment: Comment = {
      id: crypto.randomUUID(),
      lessonId,
      authorId: user.id,
      authorName: user.name,
      instructor: user.role === "instructor",
      text,
      at: new Date().toISOString(),
    };

    try {
      const raw = localStorage.getItem(KEY);
      const all = raw ? (JSON.parse(raw) as Comment[]) : [];
      writeAll([...all, comment]);
      setComments(read(lessonId));
    } catch {
      // Depo kapalıysa yorum yalnızca bu oturumda görünür.
      setComments((current) => [...current, comment]);
    }
    setDraft("");
  }

  function remove(id: string) {
    try {
      const raw = localStorage.getItem(KEY);
      const all = raw ? (JSON.parse(raw) as Comment[]) : [];
      writeAll(all.filter((c) => c.id !== id));
    } catch {
      // yoksay
    }
    setComments(read(lessonId));
  }

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="flex items-center gap-2.5 font-display text-[19px] font-semibold tracking-[-0.015em] text-text">
        <MessageSquare className="size-5 text-accent-text" strokeWidth={2} aria-hidden="true" />
        {t.title}
      </h2>
      <p className="mt-1.5 text-[14px] text-text-muted">{t.lead}</p>

      <form onSubmit={submit} className="mt-5">
        <label htmlFor={`comment-${lessonId}`} className="sr-only">
          {t.placeholder}
        </label>
        <textarea
          id={`comment-${lessonId}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t.placeholder}
          rows={3}
          className="w-full resize-y rounded-2xl bg-surface px-4 py-3 text-[15px] text-text ring-1 ring-border-strong transition-colors duration-(--dur-instant) placeholder:text-text-subtle focus:ring-accent"
        />
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-[12.5px] text-text-subtle">{t.local}</p>
          <Button type="submit" disabled={!draft.trim()}>
            {t.send}
          </Button>
        </div>
      </form>

      {comments.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-surface-2 px-4 py-6 text-center text-[14px] text-text-subtle">
          {t.empty}
        </p>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-[14px] font-semibold text-text">
                  {comment.authorName}
                  {comment.instructor ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent-text">
                      {t.instructor}
                    </span>
                  ) : null}
                </p>
                {comment.authorId === user?.id ? (
                  <button
                    type="button"
                    onClick={() => remove(comment.id)}
                    aria-label={t.delete}
                    className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-text-subtle transition-colors duration-(--dur-instant) hover:bg-surface-2 hover:text-danger"
                  >
                    <Trash2 className="size-4" strokeWidth={1.9} />
                  </button>
                ) : null}
              </div>
              <p className="mt-1.5 whitespace-pre-wrap text-[14.5px]/[1.65] text-text-muted">
                {comment.text}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
