import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Root = () => {
  return (
    <>
      <Header />
      <main className="mx-8 my-4">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
