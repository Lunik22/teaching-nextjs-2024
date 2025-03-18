"use server";

import { redirect } from "next/navigation";
import { assertAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";

export async function newItem(
  productName: string,
  description: string,
  price: number,
  category: string
) {
  const userId = assertAuth();

  const db = createDB();

  const newPost = await db
    .insertInto("marketplace")
    .values({
      userId: userId,
      productName: productName,
      description: description,
      price: price,
      category: category,
      createdAt: new Date().getTime(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log(newPost);

  redirect(`/marketplace`);
}
