import { Conversation } from "../Models/Conversations.js";
import { Users } from "../Models/Users.js";

// @ Create new conversation
// @ Return Object
const newConversation = async ({ uid, uid2 }) => {
  if (uid === uid2) return { error: "This issue isn't possible !" };

  // Control if both users exist
  const users = await Users.find({
    $or: [{ id: { $in: [uid, uid2] } }],
  });

  // Send error if one or both do not exist
  if (Number(users.length) !== 2) return { error: "Users hasn't been found !" };

  const conversation = await new Conversation({
    user1: users[0]._id,
    user2: users[1]._id,
  }).save();

  return { conversation };
};

// @ POST /api/messages/new
// @ Add new message to conversation
const newMessage = async (req, res) => {
  const { cid, uid, message } = req.body;

  const conversation = await Conversation.updateOne(
    {
      _id: cid,
    },
    { $push: { messages: [{ user: uid, message }] } }
  );

  res.status(200).send(conversation);
};

// @ GET /api/messages/user/:id
// @ Find all user's conversations with his id
const getConversationsByUser = async (req, res) => {
  const { id } = req.params;

  let conversations = await Conversation.find({
    $or: [{ user1: id }, { user2: id }],
  }).select(["user2", "messages", "_id"]);

  const users = conversations.map((conversation) => conversation.user2);

  const names = await Users.find({ id: { $in: users } }).select("pseudo");

  conversations = conversations.map((v, k) => {
    v.name = names[k].pseudo;
    return v;
  });

  res.status(200).send(conversations);
};

// @ POST /api/messages/
// @ Find conversation with the both user id
const getConversation = async (req, res) => {
  const { uid, uid2 } = req.body;

  // Find the conversation
  const conversation = await Conversation.findOne({
    $and: [{ user1: { $in: [uid, uid2] } }, { user2: { $in: [uid, uid2] } }],
  });

  // If exist, return it to the client
  if (conversation) return res.status(200).send(conversation);

  // Else create new one
  const { conversation: new_conversation, error } = await newConversation({
    uid,
    uid2,
  });

  if (error) return res.status(401).send(error);
  res.status(201).send({ conversation: new_conversation });
};

export { newMessage, getConversationsByUser, getConversation };