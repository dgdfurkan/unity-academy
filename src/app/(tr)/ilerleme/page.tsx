import { AppPage } from "@/components/app/AppPage";
import { ProgressView } from "@/components/app/ProgressView";

export default function Page() {
  return (
    <AppPage locale="tr" role="student">
      <ProgressView locale="tr" />
    </AppPage>
  );
}
