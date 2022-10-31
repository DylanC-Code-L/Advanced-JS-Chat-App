import { Users } from "../Models/Users.js";

export const addUser = async (req, res) => {
  const { email, pseudo, password } = req.body;

  const user = await new Users({ email, pseudo, password }).save();

  res.status(201).send({ result: user });
};

export const getUserByName = async (req, res) => {
  const { pseudo } = req.params;

  const user = await Users.findOne({ pseudo });

  if (!user)
    return res
      .status(400)
      .send({ error: `User '${pseudo}' hasn't been found !` });
  res.status(200).send({ result: user });
};

export const userLogIn = async (req, res) => {
  const { name, password } = req.body;

  const user = await Users.findOne({
    $or: [{ pseudo: name }, { email: name }],
  });

  if (user?.password !== password)
    return res.status(400).send({ error: "Wrong informations" });
  res.status(200).send({ result: user });
};
