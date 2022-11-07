import Express from "express";
import dotenv from "dotenv";
import { UsersRoutes } from "./Routes/users.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import { ConversationsRoutes } from "./Routes/conversations.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { onConnection } from "./Web/onConnection.js";
import { authHandler } from "./Web/authHandler.js";
import { onDisconnect } from "./Web/onDisconnection.js";

dotenv.config({ path: "./Configs/.env" });

const app = new Express();

// All environnements
app.use(cors());
app.use(bodyParser.json());

// Roads
app.use("/api/users", UsersRoutes);
app.use("/api/messages", ConversationsRoutes);

// Server listen

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

io.use(authHandler);
io.on("connection", onConnection);
// io.on("disconnect", onDisconnect);

httpServer.listen(process.env.PORT, () => {
  console.log(`<-----  Server listen on Port: ${process.env.PORT}  ----->`);
});
