import React from "react";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";

const ConversationItem = ({ conversation }) => {
  const { user2: uid2, messages, pseudo, connected } = conversation;

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
        {connected && (
          <div className="rounded-full h-4 w-4 bg-green-400 absolute left-11 bottom-4"></div>
        )}
        <div>
          <h2 className="font-bold">{pseudo}</h2>
          {message}
        </div>
      </li>
    </Link>
  );
};

export default ConversationItem;
