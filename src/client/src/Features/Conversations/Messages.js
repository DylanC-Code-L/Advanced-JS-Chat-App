import React from "react";
import Message from "./Message";
import SendMessageForm from "./SendMessageForm";

const Messages = ({ data }) => {
  const { messages, _id: cid } = data;
  const uid = localStorage.getItem("uid");

  const ordonedMessages = messages.map((message) => {
    if (message.user === uid)
      return (
        <Message message={message.message} right={true} key={message._id} />
      );
    return <Message message={message.message} key={message._id} />;
  });

  return (
    <>
      <h2>...</h2>
      <div className="absolute bottom-16 w-[80vw]">{ordonedMessages}</div>
      {<SendMessageForm cid={cid} uid={uid} />}
    </>
  );
};

export default Messages;
