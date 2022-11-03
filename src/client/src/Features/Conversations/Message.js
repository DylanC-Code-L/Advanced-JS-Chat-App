import React from "react";

const Message = ({ right, message }) => {
  if (right)
    return <p className=" text-right my-3 text-violet-300">{message}</p>;
  return <p className=" my-3 text-cyan-800">{message}</p>;
};

export default Message;
