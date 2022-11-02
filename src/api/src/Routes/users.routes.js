import Express from "express";
import {
  addUser,
  getUsers,
  getUsersByName,
  userLogIn,
} from "../Controllers/users.controllers.js";

const router = Express.Router();

router.post("", addUser);
router.post("/login", userLogIn);
router.get("/all", getUsers);
router.get("/:pseudo", getUsersByName);

export { router as UsersRoutes };
