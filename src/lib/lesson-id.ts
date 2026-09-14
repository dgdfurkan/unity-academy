/**
 * Ders kimliği üretimi. İstemci tarafı olmayan ayrı bir modülde duruyor:
 * `generateStaticParams` sunucuda çalışıyor ve `"use client"` işaretli bir
 * dosyadan fonksiyon çağıramıyor.
 */
export function lessonId(moduleIndex: number, lessonIndex: number) {
  return `m${moduleIndex + 1}-l${lessonIndex + 1}`;
}
