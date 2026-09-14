import { AppPage } from "@/components/app/AppPage";
import { LearnPath } from "@/components/app/LearnPath";

export default function Page() {
  return (
    <AppPage locale="en" role="student">
      <LearnPath locale="en" />
    </AppPage>
  );
}
