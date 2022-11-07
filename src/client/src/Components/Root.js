import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./Header";

const Root = () => {
  const socket = useLoaderData();
  socket.connect();

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
