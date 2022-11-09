import React, { useCallback, useEffect, useRef } from "react";
import Message from "./Message";

const Messages = ({ conversation }) => {
  const { messages } = conversation;
  const uid = localStorage.getItem("uid");
  const scrollRef = useRef(null);

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

  setTimeout(
    () =>
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      }),
    20
  );

  return (
    <ul
      className="min-h-[100vh] flex flex-col justify-end p-5 bg-slate-100 pb-[17vh]"
      ref={scrollRef}
    >
      {ordonedMessages}
    </ul>
  );
};

export default Messages;
