import { Schema } from "mongoose";
import db from "../Configs/database.js";

const schema = new Schema({
  user1: { type: String, required: true },
  user2: { type: String, required: true },
  messages: [{ body: String }],
});

export const Message = db.model("Message", schema);
