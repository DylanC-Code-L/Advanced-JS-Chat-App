import Express from "express";
import { addUser, getUserByName } from "../Controllers/users.controllers.js";

const router = Express.Router();

router.post("", addUser);
router.get("/:pseudo", getUserByName);

export { router as UsersRoutes };
