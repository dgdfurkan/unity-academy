import { AppPage } from "@/components/app/AppPage";
import { HomeworkView } from "@/components/app/HomeworkView";

export default function Page() {
  return (
    <AppPage locale="en" role="student">
      <HomeworkView locale="en" />
    </AppPage>
  );
}
