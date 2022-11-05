import React, { useEffect, useReducer, useState } from "react";
import { useQuery } from "react-query";
import { getAllConversations } from "../Api/conversations";
import ConversationList from "../Features/Conversations/ConversationList";
import socket from "../Web/connection";

const initialState = {
  conversations: [],
  users: [],
};

const reducer = (state, action) => {
  const { users, conversations } = action;
  const { users: oldUsers, conversations: oldConversations } = state;

  const uid = localStorage.getItem("uid");

  switch (action.type) {
    case "connected":
      const filteredUsers = users.filter((user) => user.uid !== uid);

      if (!oldConversations) return { ...state, filteredUsers };

      const updatedConversations = oldConversations.map((conv) => {
        let uid2 = conv.user1 === uid ? conv.user2 : conv.user1;
        let find = filteredUsers.find((user) => user.uid === uid2);

        conv.connected = find ? true : false;
        return conv;
      });

      return { users: filteredUsers, conversations: updatedConversations };
    case "conversations":
      if (!oldUsers[0]) return { ...state, conversations };

      const usersConnected = conversations.map((conv) => {
        let uid2 = conv.user1 === uid ? conv.user2 : conv.user1;
        let find = oldUsers.find((user) => user.uid === uid2);

        conv.connected = find ? true : false;
        return conv;
      });

      return { ...state, conversations: usersConnected };
    default:
      break;
  }
};

const AllConversations = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    socket.on("users", (users) => dispatch({ type: "connected", users }));
  }, []);

  const uid = localStorage.getItem("uid");
  const { error, isLoading, isError, isSuccess } = useQuery(
    "conversations",
    () => getAllConversations(uid),
    {
      refetchOnWindowFocus: false,
      onSuccess: ({ data }) =>
        dispatch({ type: "conversations", conversations: data }),
    }
  );

  let content;
  if (isLoading) content = <p>Is Loading ...</p>;
  else if (isError) {
    content = <p className="text-red-500">{error}</p>;
  } else if (isSuccess)
    content = <ConversationList conversations={state.conversations} />;
  return <section className="p-8">{content}</section>;
};

export default AllConversations;
