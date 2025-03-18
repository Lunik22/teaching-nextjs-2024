"use server";

import { revalidatePath } from "next/cache";
import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";

export async function sendMessage(recipientId: number, content: string) {
  const userId = assertAuth();

  const db = createDB();

  await db
    .insertInto("messages")
    .values({
      fromUserId: userId,
      toUserId: recipientId,
      message: content,
      createdAt: new Date().getTime(),
    })
    .execute();

  revalidatePath(`/messages/${recipientId}`);
}
