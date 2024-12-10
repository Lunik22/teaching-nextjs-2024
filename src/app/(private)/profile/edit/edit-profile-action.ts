"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createDB } from "../../../../lib/db";

export async function editProfile(userName: string, displayName: string) {
  const cookieStore = cookies();
  const id = Number(cookieStore.get("session-user-id")?.value);

  if (!id) {
    throw new Error("User ID not found in cookies");
  }

  const db = createDB();

  await db
    .updateTable("users")
    .set({ username: userName, displayName: displayName })
    .where("id", "=", id)
    .execute();

  redirect("/profile");
}
