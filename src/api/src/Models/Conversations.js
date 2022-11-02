import { Schema } from "mongoose";
import db from "../Configs/database.js";

const schema = new Schema({
  user1: { type: String, required: true },
  user2: { type: String, required: true },
  messages: [{ user: String, message: String }],
});

export const Conversation = db.model("Conversation", schema);
