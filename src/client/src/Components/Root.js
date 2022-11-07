import React, { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Header from "./Header";

const Root = () => {
  const navigate = useNavigate();
  const socket = useLoaderData();
  const uid = localStorage.getItem("uid");

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
