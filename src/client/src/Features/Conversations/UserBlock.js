import React from "react";
import { BsFillPersonFill } from "react-icons/bs";

const UserBlock = ({ user }) => {
  return (
    <section className="flex items-center rounded-lg shadow-xl p-4">
      <BsFillPersonFill className="h-10 w-10" />
      <h1>Bambou</h1>
    </section>
  );
};

export default UserBlock;
