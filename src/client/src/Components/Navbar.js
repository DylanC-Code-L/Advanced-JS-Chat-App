import React from "react";
import { AiFillBell, AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between w-full">
      <Link to="/">
        <AiFillHome className="h-8 w-8 cursor-pointer" />
      </Link>

      <div className="flex">
        <Link to="/conversations">
          <FaUserFriends className="h-8 w-8 mr-4 cursor-pointer" />
        </Link>
        <AiFillBell className="h-8 w-8 cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
