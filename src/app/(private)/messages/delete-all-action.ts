"use server";

import { redirect } from "next/navigation";

import { createDB } from "../../../lib/db";
import { revalidatePath } from "next/cache";

export async function deleteAll(recipientId: number) {
  const db = createDB();

  await db
    .deleteFrom("messages")
    .where("toUserId", "=", recipientId)
    .execute();

  await db
    .deleteFrom("messages")
    .where("fromUserId", "=", recipientId)
    .execute();

  

  redirect(`/messages`);
  revalidatePath(`/messages`);
}
