import axios from "axios";

const req = axios.create({ baseURL: "http://localhost:5000/api/messages/" });

export const getConversation = async ({ uid, uid2 }) => {
  const data = await req.post("", { uid, uid2 });
  return data.data;
};

export const newMessage = async (message) => {
  const data = await req.post("/new", message);
  return data.data;
};

export const getAllConversations = async (uid) => {
  const data = await req.get(`/user/${uid}`);
  return data.data;
};

export const readNews = async ({ uid, uid2 }) => {
  const data = await req.post("/read", { uid, uid2 });
  return data.data;
};
