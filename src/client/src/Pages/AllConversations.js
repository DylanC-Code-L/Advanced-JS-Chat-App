import React, { useEffect, useReducer } from "react";
import { useQuery } from "react-query";
import { useLoaderData } from "react-router-dom";
import { getAllConversations } from "../Api/conversations";
import ConversationList from "../Features/Conversations/ConversationList";

// Initial State for the reducer
const initialState = {
  users: [],
  conversations: [],
};

// Used to manage severals state with complexity logics
const reducer = (state, action) => {
  const { users, conversations } = action;
  const { users: oldUsers, conversations: oldConversations } = state;
  const uid = localStorage.getItem("uid");

  let connectedUsers = [];

  switch (action.type) {
    // When get conversations, update users connected if the Users were already send by the sockets
    case "conversations":
      connectedUsers = conversations.map((conv) => {
        const uid2 = uid === conv.user1 ? conv.user2 : conv.user1;
        let userConnected = oldUsers.find((user) => uid2 === user.uid);

        return {
          ...conv,
          status: userConnected ? "connected" : "disconnected",
        };
      });

      return { ...state, conversations: connectedUsers };
    case "users":
      // When the socket send Users connected, update the conversations to display users connected
      connectedUsers = oldConversations.map((conv) => {
        const uid2 = uid === conv.user1 ? conv.user2 : conv.user1;
        let userConnected = users.find((user) => uid2 === user.uid);

        return {
          ...conv,
          status: userConnected ? "connected" : "disconnected",
        };
      });

      return { conversations: connectedUsers, users };
    default:
      break;
  }
};

const AllConversations = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const socket = useLoaderData();

  // Get the connected users store in the session storage
  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem("connected-users")) || [];
    dispatch({ type: "users", users });

    socket.on("Users", (users) => {
      JSON.stringify(sessionStorage.setItem("users", users));
      dispatch({ type: "users", users });
    });
  }, []);

  const uid = localStorage.getItem("uid");

  // Get the user's conversatiions
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
