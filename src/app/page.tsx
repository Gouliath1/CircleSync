import { getSession } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getSession();
  if (!user) redirect("/join");

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1">CircleSync</h1>
      <p className="text-gray-500 mb-8">Welcome, {user.name}</p>

      <div className="grid gap-4">
        <a
          href="/availability"
          className="block p-4 rounded-lg border bg-white hover:bg-gray-50 transition"
        >
          <div className="font-medium">My Availability</div>
          <div className="text-sm text-gray-500">Update your schedule</div>
        </a>

        {user.isAdmin && (
          <a
            href="/admin"
            className="block p-4 rounded-lg border bg-white hover:bg-gray-50 transition"
          >
            <div className="font-medium">Admin</div>
            <div className="text-sm text-gray-500">
              Manage people, groups &amp; events
            </div>
          </a>
        )}
      </div>
    </main>
  );
}
