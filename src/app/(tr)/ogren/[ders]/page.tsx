import { LessonRoute } from "@/components/lesson/LessonRoute";
import { allCurriculumLessonIds } from "@/content/ids";

export function generateStaticParams() {
  return allCurriculumLessonIds().map((ders) => ({ ders }));
}

export default async function Page({ params }: { params: Promise<{ ders: string }> }) {
  const { ders } = await params;
  return <LessonRoute locale="tr" id={ders} />;
}
