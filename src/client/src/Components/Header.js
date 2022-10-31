import React from "react";
import { useHref } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  const url = useHref()
    .split("/")
    .find((v) => v === "account");

  return (
    <header className="flex justify-evenly items-center p-8 border-b shadow-xl">
      {!url && <Navbar />}
    </header>
  );
};

export default Header;
