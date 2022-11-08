import React, { useEffect, useRef } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getConversation } from "../Api/conversations";
import ErrorMessage from "../Components/ErrorMessage";
import Messages from "../Features/Conversations/Messages";
import SendMessageForm from "../Features/Conversations/SendMessageForm";
import UserBlock from "../Features/Conversations/UserBlock";

const conversation = () => {
  const { uid2 } = useParams();
  const uid = localStorage.getItem("uid");
  const socket = useLoaderData();

  const {
    data: conversation,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["conversation", uid2], () => getConversation({ uid, uid2 }), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <section>
      {isLoading && <p className="m-4">Is Loading...</p>}
      {isError && <ErrorMessage text={error.response.data} />}
      {isSuccess && (
        <>
          <UserBlock user={conversation.pseudo} />
          <Messages conversation={conversation} />
          <SendMessageForm cid={conversation._id} uid={uid} socket={socket} />
        </>
      )}
    </section>
  );
};

export default conversation;
