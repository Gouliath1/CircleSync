"use server";

import { redirect } from "next/navigation";
import { db } from "@/src/lib/db";
import { users } from "@/src/lib/db/schema";
import { requireAdmin } from "@/src/lib/auth";

export async function createUser(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const familyType = (formData.get("familyType") ?? "solo") as
    | "solo"
    | "couple"
    | "family";
  const location = String(formData.get("location") ?? "").trim() || null;
  const token = crypto.randomUUID();

  await db.insert(users).values({ name, location, familyType, inviteToken: token });

  redirect("/admin");
}

export async function deleteUser(formData: FormData) {
  await requireAdmin();

  const id = parseInt(String(formData.get("id")), 10);
  if (isNaN(id)) return;

  const { eq } = await import("drizzle-orm");
  await db.delete(users).where(eq(users.id, id));

  redirect("/admin");
}
