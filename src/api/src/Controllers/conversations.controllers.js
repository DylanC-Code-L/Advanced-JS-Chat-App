import { Conversation } from "../Models/Conversations.js";
import { Users } from "../Models/Users.js";

// @ Create new conversation
// @ Return Object
const newConversation = async ({ uid, uid2 }) => {
  if (uid === uid2) return { error: "This issue isn't possible !" };

  // Control if both users exist
  const users = await Users.find({
    _id: { $in: [uid, uid2] },
  });

  // Send error if one or both do not exist
  if (Number(users.length) !== 2) return { error: "Users hasn't been found !" };

  const conversation = await new Conversation({
    user1: { uid: users[0]._id },
    user2: { uid: users[1]._id },
  }).save();

  return { conversation };
};

// @ POST /api/messages/new
// @ Add new message to conversation
const newMessage = async (req, res) => {
  const { cid, uid, message } = req.body;

  let conversation = await Conversation.findById(cid);

  conversation.messages.push({ user: uid, message });
  conversation =
    conversation.user1.uid === uid
      ? conversation.user2.news + 1
      : conversation.user1.news + 1;

  conversation = await Conversation.updateOne(
    {
      _id: cid,
    },
    conversation
  );

  res.status(200).send(conversation);
};

// @ GET /api/messages/user/:id
// @ Find all user's conversations with his id
const getConversationsByUser = async (req, res) => {
  const { uid } = req.params;

  let conversations = await Conversation.find({
    $or: [{ user1: uid }, { user2: uid }],
  });

  const users = conversations.map((conversation) => {
    const { user2, user1 } = conversation;
    return user1 === uid ? user2 : user1;
  });

  const names = await Users.find({ _id: { $in: users } }).select("pseudo");

  conversations = conversations.map((v, k) => {
    v._doc.pseudo = names[k].pseudo;
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
    $and: [
      { "user1.uid": { $in: [uid, uid2] } },
      { "user2.uid": { $in: [uid, uid2] } },
    ],
  });

  const userName = await Users.findById(uid2, "pseudo");

  // If exist, return it to the client
  if (conversation)
    return res
      .status(200)
      .send({ ...conversation._doc, pseudo: userName.pseudo });

  // Else create new one
  const { conversation: new_conversation, error } = await newConversation({
    uid,
    uid2,
  });

  if (error) return res.status(401).send(error);
  res.status(201).send({ ...new_conversation._doc, pseudo: userName.pseudo });
};

export { newMessage, getConversationsByUser, getConversation };
