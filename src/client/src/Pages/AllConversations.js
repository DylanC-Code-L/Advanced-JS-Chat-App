import React, { useEffect, useReducer } from "react";
import { useQuery } from "react-query";
import { useLoaderData } from "react-router-dom";
import { getAllConversations } from "../Api/conversations";
import ErrorMessage from "../Components/ErrorMessage";
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

  const uid = localStorage.getItem("uid");

  // Get the user's conversatiions
  const {
    data: conversations,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: "conversations",
    queryFn: () => getAllConversations(uid),
    keepPreviousData: true,
  });

  // Get the connected users store in the session storage
  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem("connected-users")) || [];
    dispatch({ type: "users", users });

    socket.on("Users", (users) => {
      JSON.stringify(sessionStorage.setItem("users", users));
      dispatch({ type: "users", users });
    });

    if (typeof conversations === "object")
      dispatch({ type: "conversations", conversations });
  }, [conversations]);

  return (
    <section className="p-8">
      {isLoading ? (
        <p>Is Loading ...</p>
      ) : isError ? (
        <ErrorMessage text={error} />
      ) : (
        isSuccess && <ConversationList conversations={state.conversations} />
      )}
    </section>
  );
};

export default AllConversations;
