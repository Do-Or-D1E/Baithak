import SideNavigation from "@/components/SideNavigation";
import { auth } from "@/lib/auth";
import SignInButton from "@/components/SignInButton";
export const metadata = {
  title: "Account",
  description: "Account Baithak",
};
export default async function AccountLayout({ children }) {
  const session = await auth();
  return (
    <>
      {session ? (
        <div>
          <div className="flex flex-row">
            <SideNavigation />
            {children}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-24">
          <p className="text-2xl font-bold">Please sign in to continue</p>
          <SignInButton />
        </div>
      )}
    </>
  );
}
