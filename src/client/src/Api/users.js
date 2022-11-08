import axios from "axios";
const req = axios.create({
  baseURL: `http://localhost:5000/api/users`,
});

export const addUser = async (formData) => {
  const data = await req.post("", formData);
  return data.data;
};

export const logInUser = async (formData) => {
  const data = await req.post("/login", formData);
  return data.data;
};

export const getUserByName = async (name) => {
  const data = await req.get(`/${name}`);
  return data.data;
};

export const getUsers = async (uid) => {
  const data = await req.get(`/all/${uid}`);
  return data.data;
};
