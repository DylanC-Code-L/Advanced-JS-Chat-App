import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { newMessage } from "../../Api/conversations";
import { IoIosSend } from "react-icons/io";

const SendMessageForm = ({ cid, uid, socket }) => {
  const [message, setMessage] = useState("");

  const ref = useRef(null);
  const { uid2 } = useParams();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["conversation", uid2],
    mutationFn: () => newMessage({ cid, uid, message }),
    onSuccess: () => queryClient.invalidateQueries(["conversation", uid2]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // mutate();
    console.log(message);
    socket.emit("private message", { to: uid2, content: message });
    setMessage("");
    ref.current.focus();
  };

  const handleChange = (e) => setMessage(e.target.value);

  useEffect(() => ref.current.focus(), []);

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[15vh] w-full absolute flex justify-center items-center rounded-t-3xl bottom-0 bg-white"
    >
      <div className="relative flex items-center w-4/5">
        <textarea
          ref={ref}
          onChange={handleChange}
          value={message}
          className="w-full rounded-full border resize-none bg-slate-100 pl-4 pt-5"
          placeholder="Type here..."
        ></textarea>

        <IoIosSend
          className="absolute w-10 h-10 text-cyan-600 right-6 cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default SendMessageForm;
