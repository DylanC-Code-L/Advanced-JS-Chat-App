import { Users } from "../Models/Users.js";

export const addUser = async (req, res) => {
  const { email, pseudo, password } = req.body;

  const user = await new Users({ email, pseudo, password }).save();

  res.status(201).send({ user });
};

export const getUserByName = async (req, res) => {
  const { pseudo } = req.params;

  const user = await Users.findOne({ pseudo });

  res.status(200).send({ user });
};
