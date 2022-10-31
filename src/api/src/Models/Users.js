import { Schema } from "mongoose";
import db from "../Configs/database.js";

const schema = new Schema({
  email: { type: String, required: true },
  pseudo: { type: String, required: true },
  password: { type: String, required: true },
});

export const Users = db.model("User", schema);
