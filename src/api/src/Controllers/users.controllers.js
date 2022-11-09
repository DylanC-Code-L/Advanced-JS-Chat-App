import { Users } from "../Models/Users.js";

// @ POST /api/users/
// @ Register a new user
// !improve
const addUser = async (req, res) => {
  const { email, pseudo, password } = req.body;

  const user = await new Users({ email, pseudo, password }).save();

  res.status(201).send(user._id);
};

// !
const getUsersByName = async (req, res) => {
  const { pseudo } = req.params;

  const users = await Users.find({
    pseudo: { $regex: pseudo, $options: "i" },
  });

  if (!users[0])
    return res
      .status(400)
      .send({ error: `User '${pseudo}' hasn't been found !` });
  res.status(200).send(users);
};

// @ POST /api/users/login
// @ Connect or not an user
const userLogIn = async (req, res) => {
  const { name, password } = req.body;

  const user = await Users.findOne({
    $or: [{ pseudo: name }, { email: name }],
  });


  if (!user || user?.password !== password)
    return res.status(400).send({ error: "Wrong informations" });
  res.status(200).send(user._id);
};

// @ GET /api/users/all/:uid
// @ Find users except this equal to uid
const getUsers = async (req, res) => {
  const { uid } = req.params;
  const users = await Users.find({ _id: { $ne: uid } }, "pseudo");

  if (!users) return res.status(400).send({ error: "Try later" });
  res.status(200).send(users);
};

export { addUser, getUsers, getUsersByName, userLogIn };
