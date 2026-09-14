import { LessonRoute } from "@/components/lesson/LessonRoute";
import { allCurriculumLessonIds } from "@/content/ids";

export function generateStaticParams() {
  return allCurriculumLessonIds().map((lesson) => ({ lesson }));
}

export default async function Page({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson } = await params;
  return <LessonRoute locale="en" id={lesson} />;
}
