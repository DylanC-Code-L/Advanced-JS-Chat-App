import React, { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useQueryClient } from "react-query";

const Root = () => {
  const navigate = useNavigate();
  const socket = useLoaderData();
  const uid = localStorage.getItem("uid");
  const queryClient = useQueryClient();

  useEffect(() => {
    // If uid isn't exist return the client to the login page
    if (!uid) return navigate("/account/login");

    // Connect the user to socket
    socket.auth = { uid };
    socket.connect();

    // Control the users already connected and store them
    socket.on("Users", (users) => {
      return sessionStorage.setItem("connected-users", JSON.stringify(users));
    });

    // If new user is connecting, updtate the connected users already store
    socket.on("User connected", (user) => {
      let users = JSON.parse(sessionStorage.getItem("connected-users"));

      sessionStorage.setItem(
        "connected-users",
        JSON.stringify([...users, user])
      );
    });

    // If user is leaving, update the connected users
    socket.on("User disconnected", (userDisconnected) => {
      const usersConnected = JSON.parse(
        sessionStorage.getItem("connected-users")
      );

      const filteredUsers = usersConnected.filter(
        (user) => user.uid === userDisconnected.uid
      );

      sessionStorage.setItem("connected-users", JSON.stringify(filteredUsers));
    });

    // If new message is sending, set 'conversations' query
    socket.on("Private message", ({ content, from }) => {
      queryClient.invalidateQueries(["conversation", from]);

      const conversations = queryClient.getQueryData("conversations");
      if (!conversations) return;

      queryClient.setQueryData("conversations", (conversations) => {
        // Find the conversation
        let conversation = conversations.find(
          (conv) => conv.user1 === from || conv.user2 === from
        );

        // Add new message to its array
        conversation.messages.push({
          message: content,
          user: from,
        });
        // Increment news counter
        conversation.news =
          typeof conversation.news === "number" ? conversation.news + 1 : 1;

        // Remove the old conversation
        conversations = conversations.filter(
          (conv) => conv.user1 !== from && conv.user2 !== from
        );

        // Return updated array
        return [...conversations, conversation];
      });
    });
  }, []);

  return (
    <>
      <Header />
      <main className="bg-slate-100 h-[100vh]">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
