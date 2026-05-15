import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

const COOKIE = "cs_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function getSession() {
  const store = await cookies();
  const raw = store.get(COOKIE)?.value;
  if (!raw) return null;

  const userId = parseInt(raw, 10);
  if (isNaN(userId)) return null;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user ?? null;
}

export async function createSession(userId: number) {
  const store = await cookies();
  store.set(COOKIE, String(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function requireAdmin() {
  const user = await getSession();
  if (!user) redirect("/join");
  if (!user.isAdmin) redirect("/");
  return user;
}
