import React from "react";
import Message from "./Message";
import SendMessageForm from "./SendMessageForm";

const Messages = ({ data }) => {
  const { messages } = data;
  const uid = localStorage.getItem("uid");

  if (messages.length === 0)
    return <p>Be the first, start this conversation !</p>;

  const ordonedMessages = messages.map((message) => (
    <Message
      message={message.message}
      right={message.user === uid}
      key={message._id}
    />
  ));

  return (
    <ul className="min-h-max flex flex-row items-end">{ordonedMessages}</ul>
  );
};

export default Messages;
