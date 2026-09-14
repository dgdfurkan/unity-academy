import { AdminStudents } from "@/components/app/AdminStudents";
import { AppPage } from "@/components/app/AppPage";

export default function Page() {
  return (
    <AppPage locale="en" role="instructor">
      <AdminStudents locale="en" />
    </AppPage>
  );
}
