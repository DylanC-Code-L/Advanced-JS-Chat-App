import React from "react";

const Message = ({ right, message }) => {
  if (right)
    return (
      <li className="self-end w-max my-3 p-4 rounded-t-2xl rounded-bl-2xl text-white bg-violet-500">
        {message}
      </li>
    );

  return (
    <li className="w-max my-3 p-4 rounded-b-2xl rounded-tr-2xl bg-white">
      {message}
    </li>
  );
};

export default Message;
