import React from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const UsersList = ({ users }) => {
  if (users.length === 0)
    return <p className="text-center text-lg mt-8">Search user to text..</p>;

  const formatedUsers = users.map((user) => {
    return (
      <Link to={`/conversation/${user._id}`} key={user._id} className="ml-auto">
        <li className="rounded-lg p-4 flex items-center mb-2 bg-white">
          <BsPersonCircle className="ml-2 mr-8 h-8 w-8 text-green-400" />

          <h3 className="font-bold text-lg">{user.pseudo}</h3>

          <AiOutlineMessage className="h-8 w-8 ml-auto text-cyan-600 cursor-pointer" />
        </li>
      </Link>
    );
  });

  return <ul className="my-8">{formatedUsers}</ul>;
};

export default UsersList;
