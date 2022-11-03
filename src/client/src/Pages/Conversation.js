import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getConversation } from "../Api/conversations";
import ErrorMessage from "../Components/ErrorMessage";
import Messages from "../Features/Conversations/Messages";
import SendMessageForm from "../Features/Conversations/SendMessageForm";
import UserBlock from "../Features/Conversations/UserBlock";

const conversation = () => {
  const { uid2 } = useParams();
  const uid = localStorage.getItem("uid");

  const { data, error, isLoading, isError, isSuccess } = useQuery(
    ["conversation", uid2],
    () => getConversation({ uid, uid2 }),
    { refetchOnWindowFocus: false }
  );

  return (
    <section className="p-8">
      {isLoading && <p>Is Loading...</p>}
      {isError && <ErrorMessage text={error.response.data} />}
      {isSuccess && (
        <>
          <UserBlock />
          <Messages data={data?.data} />
          <SendMessageForm cid={data?.data._id} uid={uid} />
        </>
      )}
    </section>
  );
};

export default conversation;
