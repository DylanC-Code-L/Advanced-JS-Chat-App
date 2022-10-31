import axios from "axios";

const req = axios.create({
  baseURL: `http://localhost:${process.env.SERVER}/api/users`,
});

export const addUser = async (data) => {
  try {
    const response = await req.post("", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logUser = async (data) => {
  try {
    const response = await req.post("", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
