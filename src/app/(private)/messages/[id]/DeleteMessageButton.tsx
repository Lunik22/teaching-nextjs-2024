"use client";

import { deleteMessage } from "./delete-message-action";

type Props = {
  recipientId: number;
  messageId: number;
  userId: number;
};

export function DeleteMessageButton(props: Props) {
  return (
    <div className="flex justify-end">
      {props.userId === props.recipientId ? "" : ( 
        <button
          className="btn btn-sm "
          onClick={() => {
            deleteMessage(props.recipientId, props.messageId);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
