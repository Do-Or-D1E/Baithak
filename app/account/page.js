import SideNavigation from "@/components/SideNavigation";
import { auth } from "@/lib/auth";

export default async function Account() {
  const session = await auth();
  return (
    <div className="flex-1 p-5">
      Welcome {session ? session.user.name : "Guest"}
    </div>
  );
}
