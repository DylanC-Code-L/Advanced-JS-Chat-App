import React from "react";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";

const ConversationItem = ({ conversation }) => {
  const { user2: uid2, messages } = conversation;

  let lastMessage = messages.at(-1).message;
  lastMessage =
    lastMessage.length > 75 ? lastMessage.slice(0.75) + "..." : lastMessage;

  return (
    <Link to={`/conversation/${uid2}`}>
      <li className="flex items-center bg-slate-100 p-4 rounded-lg">
        <IoPersonSharp className="h-10 w-10 mr-3" />

        <div>
          <h2 className="font-bold">{uid2}</h2>
          <p className="text-slate-400">{lastMessage}</p>
        </div>
      </li>
    </Link>
  );
};

export default ConversationItem;
