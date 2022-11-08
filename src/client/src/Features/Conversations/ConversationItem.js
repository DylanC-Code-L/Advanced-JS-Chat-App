import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";

const ConversationItem = ({ conversation }) => {
  const {
    user2: uid2,
    messages,
    pseudo,
    news,
    status: oldStatus,
  } = conversation;
  const [status, setStatus] = useState(oldStatus);
  const socket = useLoaderData();

  useEffect(() => {
    socket.on("User connected", (user) => {
      user.uid === uid2 ? setStatus("connected") : null;
    });

    socket.on("User disconnected", (user) => {
      user.uid === uid2 ? setStatus("left") : "null";
    });
  }, [socket, status]);

  let message;
  if (messages.length === 0)
    message = <p className="text-slate-400 italic">Empty conversation</p>;
  else {
    let lastMessage = messages.at(-1).message;
    lastMessage =
      lastMessage.length > 75 ? lastMessage.slice(0.75) + "..." : lastMessage;
    message = <p className="text-slate-400">{lastMessage}</p>;
  }

  return (
    <Link to={`/conversation/${uid2}`}>
      <li className="flex items-center bg-white p-4 mb-4 rounded-lg relative">
        <IoPersonSharp className="h-10 w-10 mr-3" />

        {status === "connected" ? (
          <div className="rounded-full h-4 w-4 bg-green-400 absolute left-11 bottom-4"></div>
        ) : status === "disconnected" ? (
          <div className="rounded-full h-4 w-4 bg-red-500 absolute left-11 bottom-4"></div>
        ) : (
          status == "left" ?? (
            <div className="rounded-full h-4 w-4 bg-slate-500 absolute left-11 bottom-4"></div>
          )
        )}

        <div>
          <h2 className="font-bold">{pseudo}</h2>
          {message}
        </div>

        {news && (
          <div className="w-7 h-7 rounded-full bg-violet-500 flex justify-center items-center ml-auto">
            {news}
          </div>
        )}
      </li>
    </Link>
  );
};

export default ConversationItem;
