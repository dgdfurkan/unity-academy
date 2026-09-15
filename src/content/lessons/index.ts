import type { Lesson } from "@/content/types";
import { m1l1 } from "./m1";
import { m1l2 } from "./m1-l2";
import { m1l3 } from "./m1-l3";
import { m2l1 } from "./m2-l1";
import { m2l2 } from "./m2-l2";
import { m2l3 } from "./m2-l3";
import { m2l4 } from "./m2-l4";
import { m2l5 } from "./m2-l5";

/** Yazılmış dersler. Burada olmayan ders yolda "Yakında" olarak görünür. */
const LESSONS: Lesson[] = [m1l1, m1l2, m1l3, m2l1, m2l2, m2l3, m2l4, m2l5];

const BY_ID = new Map(LESSONS.map((lesson) => [lesson.id, lesson]));

export function getLesson(id: string): Lesson | null {
  return BY_ID.get(id) ?? null;
}

export function hasLesson(id: string): boolean {
  return BY_ID.has(id);
}

export function allLessonIds(): string[] {
  return LESSONS.map((lesson) => lesson.id);
}
