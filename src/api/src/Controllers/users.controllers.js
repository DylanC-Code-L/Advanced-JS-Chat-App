import axios from "axios";

export const addUser = async (req, res) => {
  const { email, pseudo, password } = req.body;
};

export const getUserByName = async (req, res) => {
  const { name } = req.params;
  console.log(name);
};
