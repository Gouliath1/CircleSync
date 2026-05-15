export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { requireAdmin } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { users } from "@/src/lib/db/schema";
import { createUser, deleteUser } from "./actions";

export default async function AdminPage() {
  await requireAdmin();

  const allUsers = await db.select().from(users).orderBy(users.createdAt);

  const hdrs = await headers();
  const host = hdrs.get("host") ?? "localhost:3000";
  const proto = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${proto}://${host}`;

  const familyLabel = { solo: "Solo", couple: "Couple", family: "Family" };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <a href="/" className="text-sm text-gray-500 hover:text-black transition">
          ← Home
        </a>
      </div>

      {/* People list */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
          People
        </h2>

        <div className="space-y-2">
          {allUsers.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-white text-sm"
            >
              <div>
                <span className="font-medium">{u.name}</span>
                {u.isAdmin && (
                  <span className="ml-2 text-xs bg-black text-white rounded px-1.5 py-0.5">
                    admin
                  </span>
                )}
                <span className="ml-2 text-gray-400">
                  {familyLabel[u.familyType ?? "solo"]}
                </span>
                {u.location && (
                  <span className="ml-2 text-gray-400">{u.location}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {u.inviteToken && (
                  <a
                    href={`${baseUrl}/join?token=${u.inviteToken}`}
                    target="_blank"
                    className="text-xs text-blue-600 hover:underline font-mono"
                    title="Invite link"
                  >
                    invite link ↗
                  </a>
                )}
                {!u.isAdmin && (
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={u.id} />
                    <button
                      type="submit"
                      className="text-xs text-red-400 hover:text-red-600 transition"
                    >
                      remove
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add person form */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
          Add person
        </h2>

        <form action={createUser} className="space-y-3">
          <div className="flex gap-3">
            <input
              name="name"
              type="text"
              required
              placeholder="Name"
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              name="location"
              type="text"
              placeholder="Location (optional)"
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex gap-3 items-center">
            <select
              name="familyType"
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="solo">Solo</option>
              <option value="couple">Couple</option>
              <option value="family">Family</option>
            </select>

            <button
              type="submit"
              className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 transition"
            >
              Add &amp; generate invite link
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
