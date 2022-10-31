import Express from "express";
import {
  addUser,
  getUserByName,
  userLogIn,
} from "../Controllers/users.controllers.js";

const router = Express.Router();

router.post("", addUser);
router.get("/:pseudo", getUserByName);
router.post("/login", userLogIn);

export { router as UsersRoutes };
