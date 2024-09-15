import { NextFunction, Request, Response } from "express";
import {
  CreateProjectType,
  IdType,
  ProjectQuery,
  TaskCreationType,
} from "../schema/schema";
import {
  createTaskService,
  getTaskService,
} from "../database/tasks/tasks.services";
import {
  createProjectService,
  getProjectService,
} from "../database/projects/projects.services";

export const FetchProjectTaskHandler = async (
  req: Request<IdType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await getTaskService({ project_id: req.params.id });
    res.status(200).json({
      status: "success",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateProjectHandler = async (
  req: Request<{}, {}, CreateProjectType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    console.log(user);

    const body = { title: req.body.title, user: user._id };
    const project = await createProjectService(body);

    res.status(201).json({
      status: "success",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const FetchAllProjects = async (
  req: Request<{}, {}, {}, ProjectQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.query;

    let query = {
      ...(title && { title: { $regex: title, $options: "i" } }),
    };
    const projects = await getProjectService(query);
    res.status(200).json({
      status: "success",
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};
