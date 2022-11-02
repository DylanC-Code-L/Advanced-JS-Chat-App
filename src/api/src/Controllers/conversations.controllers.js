import { Conversation } from "../Models/Conversations.js";
import { Users } from "../Models/Users.js";

const newConversation = async (req, res) => {
  const { user1, user2 } = req.body;

  const users = await Users.find({
    $or: [{ id: { $in: [user1, user2] } }, { name: { $in: [user1, user2] } }],
  });

  if (Number(users.length) !== 2)
    res.status(404).send({ error: `Users hasn't been found !` });

  const conversation = await new Conversation({
    user1: users[0]._id,
    user2: users[1]._id,
  }).save();

  if (!conversation) return res.status(500).send({ error: `Server error !` });
  res.status(200).send({
    message: `Conversation initialized between ${users[0].pseudo} and ${users[1].pseudo}`,
  });
};

const newMessage = async (req, res) => {
  const { user1, user2, message } = req.body;

  const conversation = await Conversation.updateOne(
    {
      $and: [{ user1 }, { user2 }],
    },
    { $push: { messages: [{ user: user1, message }] } }
  );

  res.status(200).send(conversation);
};

const getConversations = async (req, res) => {
  const { id } = req.params;

  const conversations = await Conversation.find({
    $or: [{ user1: id }, { user2: id }],
  });

  res.status(200).send(conversations);
};

export { newConversation, newMessage, getConversations };
