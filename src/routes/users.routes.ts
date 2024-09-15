import express from "express";
import { validate } from "../middleware/vaidate";
import {
  LoginUserHandler,
  CreateUserHandler,
} from "../controller/users.controller";
import { userCreateSchema } from "../schema/schema";

const router = express.Router();

router.route("/users").post(validate(userCreateSchema), CreateUserHandler);

router.route("/users/login").post(validate(userCreateSchema), LoginUserHandler);

export default router;
