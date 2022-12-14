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

  conversation.user1.uid === uid
    ? conversation.user2.news++
    : conversation.user1.news++;

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

  // Find users conversations with ist uid
  let conversations = await Conversation.find({
    $or: [{ "user1.uid": uid }, { "user2.uid": uid }],
  });

  // Get uid of each user2
  const users = conversations.map((conversation) => {
    const { user2, user1 } = conversation;
    return user1.uid === uid ? user2.uid : user1.uid;
  });

  // Request for get all users' name
  const names = await Users.find({ _id: { $in: users } }).select("pseudo");

  // Add each name at his conversation
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

// @ POST /api/messages/read
// @ Reset news counter of a conversation user
const readNews = async (req, res) => {
  const { uid, uid2 } = req.body;

  let conversation = await Conversation.findOne({
    $and: [
      { "user1.uid": { $in: [uid, uid2] } },
      { "user2.uid": { $in: [uid, uid2] } },
    ],
  });
  if (!conversation) return res.status(201).send("No conversation to update");

  conversation.user1.uid === uid
    ? (conversation.user1.news = 0)
    : (conversation.user2.news = 0);

  const updatedConversation = await Conversation.updateOne(
    {
      $and: [
        { "user1.uid": { $in: [uid, uid2] } },
        { "user2.uid": { $in: [uid, uid2] } },
      ],
    },
    conversation
  );

  res.status(201).send(`News counter of user '${uid}' reset`);
};
export { newMessage, getConversationsByUser, getConversation, readNews };
