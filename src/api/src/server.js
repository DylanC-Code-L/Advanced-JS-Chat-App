import Express from "express";
import dotenv from "dotenv";
import { UsersRoutes } from "./Routes/users.routes.js";
import db from "./Configs/database.js";

dotenv.config({ path: "./Configs/.env" });

const app = new Express();

// Roads
app.use("/api/users", UsersRoutes);

// Server listen

app.listen(process.env.PORT, () =>
  console.log(`<-----  Server listen on Port: ${process.env.PORT}  ----->`)
);
