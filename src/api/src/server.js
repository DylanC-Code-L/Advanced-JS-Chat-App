import Express from "express";
import dotenv from "dotenv";
import { UsersRoutes } from "./Routes/users.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import { ConversationsRoutes } from "./Routes/conversations.routes.js";

dotenv.config({ path: "./Configs/.env" });

const app = new Express();

// All environnements
app.use(cors());
app.use(bodyParser.json());

// Roads
app.use("/api/users", UsersRoutes);
app.use("/api/messages", ConversationsRoutes);

// Server listen

app.listen(process.env.PORT, () =>
  console.log(`<-----  Server listen on Port: ${process.env.PORT}  ----->`)
);
