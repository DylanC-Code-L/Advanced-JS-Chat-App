import React from "react";
import { useQuery } from "react-query";
import { getAllConversations } from "../Api/conversations";
import ConversationsList from "../Features/Conversations/ConversationsList";

const AllConversations = () => {
  const uid = localStorage.getItem("uid");

  const { data, isLoading, error, isError, refetch } = useQuery(
    "conversations",
    () => getAllConversations(uid),
    { refetchOnWindowFocus: false }
  );

  let content;
  if (isLoading) content = <p>Is Loading ...</p>;
  else if (isError) {
    content = <p className="text-red-500">{error}</p>;
    refetch();
  } else
    content = (
      <>
        <ConversationsList conversations={data.data} />
      </>
    );

  return <section>{content}</section>;
};

export default AllConversations;
