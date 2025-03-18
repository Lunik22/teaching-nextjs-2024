"use server";
import { revalidatePath } from "next/cache";
import { createDB } from "../../../../lib/db";

export async function deleteMessage(recipientId: number, messageId: number) {
  const db = createDB();

  await db
    .deleteFrom("messages")
    .where("id", "=", messageId)
    .where("toUserId", "=", recipientId)
    .execute();

  revalidatePath(`/messages/${recipientId}`);
}
