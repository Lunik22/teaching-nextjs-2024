import Link from "next/link";
import { checkAuth } from "../lib/auth";
import { createDB } from "../lib/db";

export default async function Home() {
  const userId = checkAuth();

  const db = createDB();

  const posts = await db
    .selectFrom("posts")
    .selectAll()
    .orderBy("createdAt desc")
    .execute();

  return (
    <div className="grid grid-cols-2 gap-8">
      {posts.map((p) => (
        <div key={p.id} className="card bg-blue-700 w-96 drop-shadow-md mb-4">
          <div className="card-body">
            <Link href={`/post/${p.id}`}>
              <p>{p.content}</p>
              <p>{new Date(p.createdAt).toString()}</p>
            </Link>
            <Link href={`/user/${p.userId}`}>
              {p.userId}
              {p.userId === userId ? " *" : ""}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
