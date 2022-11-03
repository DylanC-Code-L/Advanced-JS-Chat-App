import axios from "axios";
const req = axios.create({
  baseURL: `http://localhost:5000/api/users`,
});

export const addUser = async (data) => {
  return await req.post("", data);
};

export const logInUser = async (data) => {
  return await req.post("/login", data);
};

export const getUserByName = async (name) => {
  return await req.get(`/${name}`);
};

export const getUsers = async () => {
  return await req.get("/all");
};
