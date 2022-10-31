import React from "react";

const ErrorMessage = ({ text }) => {
  console.log(text);
  return <p className="text-red-500">{text}</p>;
};

export default ErrorMessage;
