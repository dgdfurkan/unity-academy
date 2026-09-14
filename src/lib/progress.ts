"use client";

import { useCallback, useEffect, useState } from "react";

export { lessonId } from "./lesson-id";

export type Progress = {
  /** Tamamlanan derslerin kimlikleri: `m1-l2` biçiminde. */
  completed: string[];
  xp: number;
  streakDays: number;
  /** Tekrar sırası gelmiş ders sayısı. */
  reviewDue: number;
};

export const EMPTY_PROGRESS: Progress = {
  completed: [],
  xp: 0,
  streakDays: 0,
  reviewDue: 0,
};

/** İlerleme kullanıcı başına ayrı tutulur, aynı tarayıcıdaki hesaplar karışmaz. */
const keyFor = (userId: string) => `ua.progress.${userId}`;

export function readProgress(userId: string): Progress {
  try {
    const raw = localStorage.getItem(keyFor(userId));
    if (raw) return { ...EMPTY_PROGRESS, ...(JSON.parse(raw) as Partial<Progress>) };
  } catch {
    // okuma engellendi, boş ilerlemeyle devam
  }
  return EMPTY_PROGRESS;
}

/**
 * Şimdilik tarayıcıda tutuluyor. Firebase bağlandığında bu hook'un gövdesi
 * Firestore'a bakacak, çağıran taraf değişmeyecek.
 */
export function useProgress(userId: string | undefined) {
  // Sunucuda ve ilk boyamada boş başlar, yoksa hidrasyon uyuşmazlığı çıkar.
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setProgress(readProgress(userId));
    setLoaded(true);
  }, [userId]);

  const complete = useCallback(
    (id: string, xpGain: number) => {
      if (!userId) return;
      setProgress((current) => {
        if (current.completed.includes(id)) return current;
        const next: Progress = {
          ...current,
          completed: [...current.completed, id],
          xp: current.xp + xpGain,
        };
        try {
          localStorage.setItem(keyFor(userId), JSON.stringify(next));
        } catch {
          // yazma engellendi, ilerleme bu oturumda kalır
        }
        return next;
      });
    },
    [userId],
  );

  return { progress, loaded, complete };
}
