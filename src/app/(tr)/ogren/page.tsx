import { AppPage } from "@/components/app/AppPage";
import { LearnPath } from "@/components/app/LearnPath";

export default function Page() {
  return (
    <AppPage locale="tr" role="student">
      <LearnPath locale="tr" />
    </AppPage>
  );
}
