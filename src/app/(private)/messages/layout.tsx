
import Link from "next/link";
import { assertAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";
import { DeleteAllButton } from "./DeleteAllButton";

export default async function MessageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const userId = assertAuth();
  
  const db = createDB();

  const messageUsers = await db
    .with("messageUsers", (db) =>
      db
        .selectFrom("messages")
        .select((eb) => [
          "toUserId as userId",
          eb.fn.max("createdAt").as("maxCreatedAt"),
        ])
        .where("fromUserId", "=", userId)
        .groupBy(["fromUserId", "toUserId"])
        .union(
          db
            .selectFrom("messages")
            .select((eb) => [
              "fromUserId as userId",
              eb.fn.max("createdAt").as("maxCreatedAt"),
            ])
            .where("toUserId", "=", userId)
            .groupBy(["fromUserId", "toUserId"])
        )
    )
    .selectFrom("messageUsers")
    .innerJoin("users", "messageUsers.userId", "users.id")
    .select((eb) => [
      "users.id",
      "users.username",
      "users.displayName",
      eb.fn.max("maxCreatedAt").as("maxCreatedAt"),
    ])
    .groupBy(["users.id", "users.username", "users.displayName"])
    .orderBy((eb) => eb.fn.max("maxCreatedAt"), "desc")
    .execute();
  return (
    <div className="flex flex-row space-x-4">
      <div>
        <div className="card bg-base-100 w-96 drop-shadow-md overflow-y-auto">
          <div className="card-body">
            Message
            <div>
              <ul className="menu menu-vertical px-1">
                {messageUsers.map((r) => (
                  <li key={r.id} className="flex flex-row space-x-2 justify-between">
                    <Link href={`/messages/${r.id}`} className="btn btn-ghost">
                      {r.displayName ?? r.username}
                    </Link>
                    <DeleteAllButton recipientId={r.id} userId={userId}/>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}