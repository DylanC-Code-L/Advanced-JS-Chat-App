import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Root = () => {
  return (
    <>
      <Header />
      <main className="bg-slate-300 h-[100vh]">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
