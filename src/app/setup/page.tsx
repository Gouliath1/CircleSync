export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { db } from "@/src/lib/db";
import { users } from "@/src/lib/db/schema";
import { createSession } from "@/src/lib/auth";

export default async function SetupPage() {
  const existing = await db.select({ id: users.id }).from(users).limit(1);
  if (existing.length > 0) redirect("/");

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-1">Welcome to CircleSync</h1>
        <p className="text-gray-500 mb-8 text-sm">
          No users yet. Create the admin account to get started.
        </p>

        <form action={createAdmin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoFocus
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="location">
              Location <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 transition"
          >
            Create admin account
          </button>
        </form>
      </div>
    </main>
  );
}

async function createAdmin(formData: FormData) {
  "use server";

  const existing = await db.select({ id: users.id }).from(users).limit(1);
  if (existing.length > 0) redirect("/");

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const token = crypto.randomUUID();

  const [user] = await db
    .insert(users)
    .values({ name, location: String(formData.get("location") ?? "") || null, isAdmin: true, inviteToken: token })
    .returning();

  await createSession(user.id);
  redirect("/admin");
}
