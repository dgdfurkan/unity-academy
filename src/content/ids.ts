import { getDictionary } from "@/i18n";
import { lessonId } from "@/lib/lesson-id";

/**
 * Müfredattaki bütün ders kimlikleri. Statik export dinamik rotaları önceden
 * üretmek zorunda, bu liste onun kaynağı.
 */
export function allCurriculumLessonIds(): string[] {
  const modules = getDictionary("tr").curriculum.items;
  return modules.flatMap((mod, mi) => mod.lessons.map((_, li) => lessonId(mi, li)));
}
