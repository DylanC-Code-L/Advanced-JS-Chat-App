import axios from "axios";
const req = axios.create({
  baseURL: `http://localhost:5000/api/users`,
});

export const addUser = async (data) => {
  try {
    const response = await req.post("", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logInUser = async (data) => {
  try {
    const response = await req.post("/login", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
    
  } catch (error) {
    
  }
};
