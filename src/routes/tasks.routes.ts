import express from "express";
import { validate } from "../middleware/vaidate";
import {
  idSchema,
  taskCreationSchema,
  taskUpdateSchema,
} from "../schema/schema";
import {
  CreateTaskHandler,
  DeleteTaskHandler,
  UpdateTaskHandler,
} from "../controller/tasks.controller";
import { deserializeUser } from "../middleware/deserializeUser";

const router = express.Router();

router
  .route("/tasks")
  .post(deserializeUser, validate(taskCreationSchema), CreateTaskHandler);
router
  .route("/tasks/:id")
  .put(deserializeUser, validate(taskUpdateSchema), UpdateTaskHandler)
  .delete(deserializeUser, validate(idSchema), DeleteTaskHandler);

export default router;
