import { Schema } from "mongoose";
import db from "../Configs/database.js";

const schema = new Schema({
  user1: {
    uid: { type: String, required: true },
    news: { type: Number, default: 0 },
  },
  user2: {
    uid: { type: String, required: true },
    news: { type: Number, default: 0 },
  },
  messages: [{ user: String, message: String }],
});

export const Conversation = db.model("Conversation", schema);
