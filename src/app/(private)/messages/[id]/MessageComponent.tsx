"use client";

import { formatDistanceToNow, format } from 'date-fns';

type Props = {
  fromUserId: number;
  userId: number;
  message: string;
  id: number;
  createdAt: number;
};

export default function MessageBubble(props: Props) {

  const messageDate = new Date(Number(props.createdAt));
  const now = new Date();
  const timeDifference = now.getTime() - messageDate.getTime();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  const formattedDate = timeDifference < oneDayInMilliseconds
    ? formatDistanceToNow(messageDate)
    : format(messageDate, 'dd.MM.yyyy HH:mm');

  return (
    <div
      key={props.id}
      className={`chat ${
        props.fromUserId === props.userId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-bubble chat-bubble-accent">{props.message}</div>
      <br />
      <p>{formattedDate}</p>
    </div>
  );
}