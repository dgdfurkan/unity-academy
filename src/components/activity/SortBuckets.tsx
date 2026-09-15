"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Activity } from "@/content/types";
import { getDictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Öğeleri kutulara ayır. Eşleştirmeden farkı, birden çok öğenin aynı kutuya
 * girebilmesi: "bunu motor mu yapar, ben mi" gibi sınıflandırmalar için doğru
 * biçim bu. Yanlış yerleştirme sadece geri döner, ceza yok.
 */
export function SortBuckets({
  activity,
  locale,
  onDone,
}: {
  activity: Extract<Activity, { kind: "sort" }>;
  locale: Locale;
  onDone?: () => void;
}) {
  const t = getDictionary(locale).lesson;
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [active, setActive] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const remaining = activity.items
    .map((_, i) => i)
    .filter((i) => !(i in placed));

  function drop(bucketId: string) {
    if (active === null) return;
    const item = activity.items[active];
    if (!item) return;

    if (item.bucket === bucketId) {
      const next = { ...placed, [active]: bucketId };
      setPlaced(next);
      setNote(item.why[locale]);
      setActive(null);
      setWrong(null);
      if (Object.keys(next).length === activity.items.length) onDone?.();
    } else {
      setWrong(active);
      setNote(null);
      window.setTimeout(() => setWrong(null), 600);
    }
  }

  return (
    <div>
      <p className="text-[16px]/[1.6] font-medium text-text">{activity.question[locale]}</p>
      <p className="mt-1.5 text-[13px] text-text-subtle">{t.sortHint}</p>

      {/* Sıradaki öğeler */}
      <ul className="mt-5 flex flex-wrap gap-2">
        {remaining.map((i) => {
          const item = activity.items[i];
          if (!item) return null;
          return (
            <li key={item.text[locale]}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2.5 text-[14px] ring-1 transition-colors duration-(--dur-instant)",
                  wrong === i
                    ? "animate-shake bg-danger-surface text-text ring-danger"
                    : active === i
                      ? "bg-accent text-on-accent ring-accent"
                      : "bg-surface text-text ring-border hover:ring-border-strong",
                )}
              >
                {item.text[locale]}
              </button>
            </li>
          );
        })}
        {remaining.length === 0 ? (
          <li className="text-[14px] text-text-subtle">{t.sortDone}</li>
        ) : null}
      </ul>

      {/* Kutular */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {activity.buckets.map((bucket) => {
          const inside = Object.entries(placed)
            .filter(([, b]) => b === bucket.id)
            .map(([i]) => activity.items[Number(i)]);

          return (
            <button
              key={bucket.id}
              type="button"
              onClick={() => drop(bucket.id)}
              disabled={active === null}
              className={cn(
                "min-h-28 rounded-2xl p-4 text-left ring-1 transition-colors duration-(--dur-fast)",
                active === null
                  ? "bg-surface-2 ring-border"
                  : "cursor-pointer bg-surface ring-accent/50 hover:bg-accent-soft",
              )}
            >
              <span className="block text-[13px] font-semibold uppercase tracking-wide text-text-subtle">
                {bucket.label[locale]}
              </span>
              <span className="mt-2.5 flex flex-wrap gap-1.5">
                {inside.map((item) =>
                  item ? (
                    <span
                      key={item.text[locale]}
                      className="flex items-center gap-1.5 rounded-full bg-success-surface px-3 py-1.5 text-[13px] text-text"
                    >
                      <Check className="size-3 text-success" strokeWidth={3.5} aria-hidden="true" />
                      {item.text[locale]}
                    </span>
                  ) : null,
                )}
              </span>
            </button>
          );
        })}
      </div>

      {note ? (
        <p className="mt-4 flex gap-2.5 rounded-2xl bg-success-surface px-4 py-3 text-[13.5px]/[1.6] text-text">
          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
          {note}
        </p>
      ) : null}

      {Object.keys(placed).length > 0 ? (
        <Button
          size="sm"
          variant="ghost"
          className="mt-3"
          onClick={() => {
            setPlaced({});
            setActive(null);
            setNote(null);
          }}
        >
          <RotateCcw className="size-3.5" strokeWidth={2} aria-hidden="true" />
          {t.reset}
        </Button>
      ) : null}
    </div>
  );
}
