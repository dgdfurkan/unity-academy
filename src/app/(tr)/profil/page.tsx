import { AppPage } from "@/components/app/AppPage";
import { ProfileView } from "@/components/app/ProfileView";

export default function Page() {
  return (
    <AppPage locale="tr">
      <ProfileView locale="tr" />
    </AppPage>
  );
}
