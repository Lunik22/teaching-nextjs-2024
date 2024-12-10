import { EditProfileForm } from "./EditProfileForm";
import { cookies } from "next/headers";
import { createDB } from "../../../lib/db";

export default async function LoginPage() {
  const cookieStore = cookies();
  const id = Number(cookieStore.get('session-user-id')?.value);

  if (!id) {
    throw new Error("User ID not found in cookies");
  }

  const db = createDB();

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirstOrThrow();


  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <EditProfileForm username={user.username} displayName={user.displayName || ''}/>
      </div>
    </div>
  );
}
