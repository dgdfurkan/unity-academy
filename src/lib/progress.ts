"use client";

import { useCallback, useEffect, useState } from "react";

export type Progress = {
  /** Tamamlanan derslerin kimlikleri: `m1-l2` biçiminde. */
  completed: string[];
  xp: number;
  streakDays: number;
  /** Tekrar sırası gelmiş ders sayısı. */
  reviewDue: number;
};

const EMPTY: Progress = { completed: [], xp: 0, streakDays: 0, reviewDue: 0 };
const KEY = "ua.progress";

export function lessonId(moduleIndex: number, lessonIndex: number) {
  return `m${moduleIndex + 1}-l${lessonIndex + 1}`;
}

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Progress>) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

/**
 * İlerleme şimdilik tarayıcıda tutuluyor. Firebase bağlandığında bu hook'un
 * gövdesi Firestore'a bakacak, çağıran taraf değişmeyecek.
 */
export function useProgress() {
  // Sunucuda ve ilk boyamada boş başlar, yoksa hidrasyon uyuşmazlığı çıkar.
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(read());
    setLoaded(true);
  }, []);

  const complete = useCallback((id: string, xpGain: number) => {
    setProgress((current) => {
      if (current.completed.includes(id)) return current;
      const next: Progress = {
        ...current,
        completed: [...current.completed, id],
        xp: current.xp + xpGain,
      };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // yazma engellendi, ilerleme bu oturumda kalır
      }
      return next;
    });
  }, []);

  return { progress, loaded, complete };
}
