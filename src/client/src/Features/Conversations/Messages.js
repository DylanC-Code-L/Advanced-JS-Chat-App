import React, { useEffect, useRef } from "react";
import Message from "./Message";

const Messages = ({ data }) => {
  const { messages } = data;
  const uid = localStorage.getItem("uid");
  const ref = useRef(null);

  if (messages.length === 0)
    return (
      <p className="text-center mt-10 text-xl">
        Be the first, start this conversation !
      </p>
    );

  const ordonedMessages = messages.map((message) => (
    <Message
      message={message.message}
      right={message.user === uid}
      key={message._id}
    />
  ));

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ul className="min-h-[75vh] flex flex-col justify-end p-5 bg-slate-100 pb-[17vh]">
      {ordonedMessages}
      <div ref={ref}></div>
    </ul>
  );
};

export default Messages;
