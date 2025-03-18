"use client";

import { deleteAll } from "./delete-all-action";

type Props = {
  recipientId: number;
  userId: number;
};

export function DeleteAllButton(props: Props) {
  return (
    <div className="flex justify-end">
      {props.userId === props.recipientId ? "" : ( 
        <button
          className="btn btn-sm "
          onClick={() => {
            deleteAll(props.recipientId);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
