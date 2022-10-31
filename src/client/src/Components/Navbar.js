import React, { useState } from "react";
import { AiFillBell } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
const Navbar = () => {
  return (
    <nav className="flex justify-between w-full">
      <RiMenu3Fill className="h-8 w-8 cursor-pointer" />

      <div className="flex">
        <FaUserFriends className="h-8 w-8 mr-4 cursor-pointer" />
        <AiFillBell className="h-8 w-8 cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
