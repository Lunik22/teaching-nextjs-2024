// WITH message_users AS (
//   SELECT to_user_id AS user_id,
//     MAX(created_at) AS max_created_at
//   FROM messages
//   WHERE from_user_id = 1
//   GROUP BY from_user_id,
//     to_user_id
//   UNION
//   SELECT from_user_id AS user_id,
//     MAX(created_at) AS max_created_at
//   FROM messages
//   WHERE to_user_id = 1
//   GROUP BY from_user_id,
//     to_user_id
// )
// SELECT u.id,
//   u.username,
//   MAX(max_created_at)
// FROM message_users
//   INNER JOIN users u ON message_users.user_id = u.id
// GROUP BY u.id,
//   u.username
// ORDER BY MAX(max_created_at) DESC;

import Link from "next/link";

export default async function Messages() {
  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        Message
        <Link href={``} className="btn btn-ghost">
          New Message
        </Link>
      </div>
    </div>
  );
}
