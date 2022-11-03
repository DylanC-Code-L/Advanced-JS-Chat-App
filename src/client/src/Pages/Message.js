import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const Message = () => {
  const { uid2 } = useParams();

  const { data, error, isLoading, isError } = useQuery(
    ["conversation", uid2],
    () => {},
    { refetchOnWindowFocus: false }
  );

  return <section></section>;
};

export default Message;
