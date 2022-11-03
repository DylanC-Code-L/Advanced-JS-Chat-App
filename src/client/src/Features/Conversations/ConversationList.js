import React from "react";
import ConversationItem from "./ConversationItem";

const ConversationList = ({ conversations }) => {
  if (conversations.length === 0)
    return <p className="text-center">Any conversation has been found !</p>;

  const ordonnedConversations = conversations.map((conversation) => (
    <ConversationItem conversation={conversation} key={conversation._id} />
  ));

  return <ul>{ordonnedConversations}</ul>;
};

export default ConversationList;
