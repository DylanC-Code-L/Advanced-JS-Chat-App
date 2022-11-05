import React from "react";
import { AiFillBell, AiFillHome } from "react-icons/ai";
import { TiMessages } from "react-icons/ti";
import { Link, useHref } from "react-router-dom";

const Navbar = () => {
  const url = useHref();

  const design = "h-12 w-12 ";
  const target = " text-cyan-500";

  return (
    <nav className="flex justify-between w-full">
      <Link to="/">
        <AiFillHome className={`${design} ${url === "/" ? target : ""}`} />
      </Link>

      <div className="flex">
        <Link to="/conversations">
          <TiMessages
            className={`${design}  ${
              url === "/conversations" ? target : ""
            } mr-8`}
          />
        </Link>
        <Link to="/">
          <AiFillBell className={`${design} ${url === "/..." ? target : ""}`} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
