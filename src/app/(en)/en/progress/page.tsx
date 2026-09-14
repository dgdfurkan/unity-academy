import { AppPage } from "@/components/app/AppPage";
import { ProgressView } from "@/components/app/ProgressView";

export default function Page() {
  return (
    <AppPage locale="en" role="student">
      <ProgressView locale="en" />
    </AppPage>
  );
}
