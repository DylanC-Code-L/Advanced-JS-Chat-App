import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { newMessage } from "../../Api/conversations";
import { IoIosSend } from "react-icons/io";

const SendMessageForm = ({ cid, uid }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => setMessage(e.target.value);

  const queryClient = useQueryClient();

  const { uid2 } = useParams();
  const { mutate } = useMutation({
    mutationKey: ["conversation", uid2],
    mutationFn: () => newMessage({ cid, uid, message }),
    onSuccess: () => queryClient.invalidateQueries(["conversation", uid2]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <textarea
        onChange={handleChange}
        value={message}
        className="w-full p-2 rounded-lg border resize-none"
      ></textarea>
      <IoIosSend
        className="absolute top-[15%] right-3 w-12 h-12 cursor-pointer"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default SendMessageForm;
