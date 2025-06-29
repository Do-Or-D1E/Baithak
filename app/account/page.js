import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    // Handle unauthenticated state, e.g., redirect to login or show a message
    return <p>Please log in to view this page.</p>;
  }

  const firstName = session.user.name.split(" ").at(0);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}!
    </h2>
  );
}
