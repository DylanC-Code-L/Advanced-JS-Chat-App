import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getConversation } from "../Api/conversations";
import ErrorMessage from "../Components/ErrorMessage";
import Messages from "../Features/Conversations/Messages";

const conversation = () => {
  const { uid2 } = useParams();
  const uid = localStorage.getItem("uid");

  const { data, error, isLoading, isError, isSuccess } = useQuery(
    ["conversation", uid2],
    () => getConversation({ uid, uid2 }),
    { refetchOnWindowFocus: false }
  );

  return (
    <section className="border rounded-lg min-h-[70vh] p-4 relative overflow-hidden">
      {isLoading && <p>Is Loading...</p>}
      {isError && <ErrorMessage text={error} />}
      {isSuccess && <Messages data={data.data} />}
    </section>
  );
};

export default conversation;
