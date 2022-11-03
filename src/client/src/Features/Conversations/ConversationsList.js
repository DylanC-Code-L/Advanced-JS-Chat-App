import React from "react";
import ConversationItem from "./ConversationItem";

const ConversationsList = ({ conversations }) => {
  const ordonnedConversations = conversations.map((conversation) => (
    <ConversationItem conversation={conversation} key={conversation._id} />
  ));

  return <ul>{ordonnedConversations}</ul>;
};

export default ConversationsList;
