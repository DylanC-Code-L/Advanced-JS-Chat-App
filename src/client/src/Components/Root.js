import React, { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useQueryClient } from "react-query";

const Root = () => {
  const navigate = useNavigate();
  const socket = useLoaderData();
  const uid = localStorage.getItem("uid");
  const queryClient = useQueryClient();

  // Control if uid exist
  useEffect(() => {
    if (!uid) return navigate("/account/login");

    socket.auth = { uid };
    socket.connect();

    socket.on("Users", (users) => {
      return sessionStorage.setItem("connected-users", JSON.stringify(users));
    });

    socket.on("User connected", (user) => {
      let users = JSON.parse(sessionStorage.getItem("connected-users"));

      sessionStorage.setItem(
        "connected-users",
        JSON.stringify([...users, user])
      );
    });

    socket.on("User disconnected", (userDisconnected) => {
      const usersConnected = JSON.parse(
        sessionStorage.getItem("connected-users")
      );

      const filteredUsers = usersConnected.filter(
        (user) => user.uid === userDisconnected.uid
      );

      sessionStorage.setItem("connected-users", JSON.stringify(filteredUsers));
    });

    socket.on("Private message", ({ content, from }) => {
      queryClient.invalidateQueries(["conversation", from]);
      queryClient.setQueryData("conversations", (conversations) => {
        let conversation = conversations.find(
          (conv) => conv.user1 === from || conv.user2 === from
        );

        conversation.messages.push({
          message: content,
          user: from,
        });

        conversation.news =
          conversation.news === "number" ? conversation.news++ : 1;

        conversations = conversations.filter(
          (conv) => conv.user1 !== from && conv.user2 !== from
        );

        return [...conversations, conversation];
      });

      return [];
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
