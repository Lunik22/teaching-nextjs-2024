"use client";

import { useForm } from "react-hook-form";
import { sendMessage } from "./send-message-form";

type Props = {
  recipientId: number;
};

interface FormValue {
  content: string;
}

export function SendMessageForm(props: Props) {
  const { register, handleSubmit, reset } = useForm<FormValue>();

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        await sendMessage(props.recipientId, data.content);
        reset();
      })}
    >
      <textarea
        {...register("content")}
        className="textarea textarea-bordered"
        placeholder="Text ..."
      ></textarea>
      <input
        className="btn btn-sm btn-outline"
        type="submit"
        value="Send"
      />
    </form>
  );
}
