import React, { useEffect, useRef } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getConversation } from "../Api/conversations";
import ErrorMessage from "../Components/ErrorMessage";
import Messages from "../Features/Conversations/Messages";
import SendMessageForm from "../Features/Conversations/SendMessageForm";
import UserBlock from "../Features/Conversations/UserBlock";

const Conversation = () => {
  const { uid2 } = useParams();
  const uid = localStorage.getItem("uid");
  const socket = useLoaderData();
  const queryClient = useQueryClient();

  const {
    data: conversation,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(["conversation", uid2], () => getConversation({ uid, uid2 }));

  // const { mutate } = useMutation(["conversation", uid2], {
  //   mutationFn: () => newsRead({ uid, uid2 }),
  //   onSuccess: () => {
  //     const conversations = queryClient.getQueryData("conversations");
  //     const conversation = conversations.find(
  //       (conv) => conv.user1 === uid2 || conv.user2 === uid2
  //     );

  //     const filteredConvs = conversations.filter(
  //       (conv) => conv.user1 !== uid2 && conv.user2 !== uid2
  //     );

  //     queryClient.setQueryData("conversations");
  //   },
  // });

  return (
    <section>
      {isLoading ? (
        <p className="m-4">Is Loading...</p>
      ) : isError ? (
        <ErrorMessage text={error.response.data} />
      ) : (
        isSuccess && (
          <>
            <UserBlock user={conversation.pseudo} />
            <Messages conversation={conversation} />
            <SendMessageForm cid={conversation._id} uid={uid} socket={socket} />
          </>
        )
      )}
    </section>
  );
};

export default Conversation;
