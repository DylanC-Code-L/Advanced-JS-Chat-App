import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const UserBlock = ({ user }) => {
  return (
    <section className="h-[10vh] flex items-center p-4 rounded-b-3xl shadow-lg bg-white fixed w-full z-50">
      <Link to="/conversations">
        <AiOutlineArrowLeft className="h-6 w-6 ml-4 mr-8" />
      </Link>
      <BsFillPersonFill className="h-12 w-12 p-2 mr-10 bg-cyan-500 rounded-full" />
      <h1 className="text-2xl">{user}</h1>
    </section>
  );
};

export default UserBlock;
