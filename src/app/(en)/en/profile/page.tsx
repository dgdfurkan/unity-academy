import { AppPage } from "@/components/app/AppPage";
import { ProfileView } from "@/components/app/ProfileView";

export default function Page() {
  return (
    <AppPage locale="en">
      <ProfileView locale="en" />
    </AppPage>
  );
}
