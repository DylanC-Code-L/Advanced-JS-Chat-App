import Express from "express";
import {
  addUser,
  getUserByName,
  userLogIn,
} from "../Controllers/users.controllers.js";

const router = Express.Router();

router.post("", addUser);
router.post("/login", userLogIn);
router.get("/:pseudo", getUserByName);

export { router as UsersRoutes };
