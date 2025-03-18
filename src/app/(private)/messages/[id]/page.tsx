import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";
import { DeleteMessageButton } from "./DeleteMessageButton";
import MessageBubble from "./MessageComponent";
import { SendMessageForm } from "./SendMessageForm";


type Props = { params: { id: string } };

export default async function MessagesUserPage(props: Props) {
  console.log("Messages with user id:", props.params.id);

  const id = parseInt(props.params.id);

  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  const userId = assertAuth();

  const db = createDB();

  const messages = await db
    .selectFrom("messages")
    .selectAll()
    .where((eb) =>
      eb.or([
        eb.and([eb("fromUserId", "=", userId), eb("toUserId", "=", id)]),
        eb.and([eb("toUserId", "=", userId), eb("fromUserId", "=", id)]),
      ])
    )
    .orderBy("createdAt", "desc")
    .execute();

  return (
    <div className="card bg-base-100 drop-shadow-md">
      <div className="card-body">
        <SendMessageForm recipientId={id} />
        {messages.map((m) => (
          <>
            <MessageBubble
              key={m.id}
              fromUserId={m.fromUserId}
              userId={userId}
              message={m.message}
              id={m.id}
              createdAt={m.createdAt}
            />
            <DeleteMessageButton recipientId={m.toUserId} messageId={m.id} userId={userId}/>
          </>
        ))}
      </div>
    </div>
  );
}
