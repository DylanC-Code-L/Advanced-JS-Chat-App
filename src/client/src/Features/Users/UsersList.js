import React from "react";
import { AiOutlineMessage, AiOutlineUserAdd } from "react-icons/ai";

const UsersList = ({ users }) => {
  const formatedUsers = users.map((user) => {
    return (
      <li
        key={user._id}
        className="border rounded-lg p-2 flex items-center mb-2"
      >
        <AiOutlineUserAdd className="ml-2 mr-8 h-8 w-8 text-green-400 cursor-pointer" />
        <h3 className="font-bold">{user.pseudo}</h3>
        <AiOutlineMessage className="ml-auto h-8 w-8 text-cyan-600 cursor-pointer" />
      </li>
    );
  });

  return <ul className="my-8">{formatedUsers}</ul>;
};

export default UsersList;
