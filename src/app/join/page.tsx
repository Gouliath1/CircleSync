import { redirect } from "next/navigation";
import { db } from "@/src/lib/db";
import { users } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/src/lib/auth";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function JoinPage({ searchParams }: Props) {
  const [existing] = await db.select({ id: users.id }).from(users).limit(1);
  if (!existing) redirect("/setup");

  const { token } = await searchParams;

  if (token) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.inviteToken, token))
      .limit(1);

    if (user) {
      await createSession(user.id);
      redirect("/");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-sm w-full text-center">
        <h1 className="text-2xl font-semibold mb-2">CircleSync</h1>
        <p className="text-gray-500 mb-8">
          Use the invitation link you received to access this app.
        </p>

        {token && (
          <p className="text-red-500 text-sm">
            Invalid or expired invitation link.
          </p>
        )}
      </div>
    </main>
  );
}
