import React, { useEffect, useRef } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getConversation, readNews } from "../Api/conversations";
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
  } = useQuery(["conversation", uid2], () => getConversation({ uid, uid2 }), {
    refetchInterval: 0,
  });

  const { mutate } = useMutation("conversations", {
    mutationFn: () => readNews({ uid, uid2 }),
    onSuccess: () => {
      const conversations = queryClient.getQueryData("conversations");
      if (!conversations) return;

      let conversation = conversations.find(
        (conv) => conv.user1.uid === uid2 || conv.user2.uid === uid2
      );

      conversation.user1.uid === uid
        ? (conversation.user1.news = 0)
        : (conversation.user2.news = 0);

      const filteredConvs = conversations.filter(
        (conv) => conv.user1.uid !== uid2 && conv.user2.uid !== uid2
      );

      queryClient.setQueryData("conversations", [
        ...filteredConvs,
        conversation,
      ]);
    },
  });

  useEffect(() => {
    mutate();
  }, []);
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
