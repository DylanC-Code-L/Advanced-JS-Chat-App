import React from "react";
import { useQuery } from "react-query";
import { getAllConversations } from "../Api/conversations";
import ConversationList from "../Features/Conversations/ConversationList";

const AllConversations = () => {
  const uid = localStorage.getItem("uid");

  const { data, error, refetch, isLoading, isError, isSuccess } = useQuery(
    "conversations",
    () => getAllConversations(uid),
    { refetchOnWindowFocus: false }
  );

  let content;
  if (isLoading) content = <p>Is Loading ...</p>;
  else if (isError) {
    content = <p className="text-red-500">{error}</p>;
  } else if (isSuccess)
    content = <ConversationList conversations={data.data} />;

  return <section className="p-8">{content}</section>;
};

export default AllConversations;
