import express from "express";
import { createProjectSchema, idSchema } from "../schema/schema";
import { validate } from "../middleware/vaidate";
import {
  CreateProjectHandler,
  FetchAllProjects,
  FetchProjectTaskHandler,
} from "../controller/projects.controller";
import { deserializeUser } from "../middleware/deserializeUser";

const router = express.Router();

router
  .route("/projects")
  .post(deserializeUser, validate(createProjectSchema), CreateProjectHandler)
  .get(deserializeUser, FetchAllProjects);

router
  .route("/projects/:id/tasks")
  .get(deserializeUser, validate(idSchema), FetchProjectTaskHandler);

export default router;
