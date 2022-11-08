import axios from "axios";

const req = axios.create({ baseURL: "http://localhost:5000/api/messages/" });

export const getConversation = async ({ uid, uid2 }) => {
  return await req.post("", { uid, uid2 });
};

export const newMessage = async (data) => {
  return await req.post("/new", data);
};

export const getAllConversations = async (uid) => {
  const data = await req.get(`/user/${uid}`);
  return data.data;
};
