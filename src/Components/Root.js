import React from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="bg-slate-300 h-[100vh]">
      <h1 className="text-white text-4xl text-center py-5">Chat-App</h1>
      <Outlet />
    </main>
  );
};

export default Root;
