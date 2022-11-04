import React from "react";
import { useHref } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  const url = useHref()
    .split("/")
    .find((v) => v === "account" || v === "conversation");

  if (!url)
    return (
      <header className="fixed bottom-0 w-full flex justify-evenly items-center p-10 border-b bg-white rounded-t-3xl">
        <Navbar />
      </header>
    );
};

export default Header;
