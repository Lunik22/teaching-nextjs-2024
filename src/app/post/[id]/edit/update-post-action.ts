"use server";

import { redirect } from "next/navigation";
import { createDB } from "../../../../lib/db";

export async function updatePost(id: number, content: string) {
  console.log(`Updating post with id: ${id}, and content: ${content}`);

  const db = createDB();

  await db
    .updateTable("posts")
    .set({ content: content })
    .where("id", "=", id)
    .execute();

  redirect(`/post/${id}`);
}