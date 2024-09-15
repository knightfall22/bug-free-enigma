import { NextFunction, Request, Response } from "express";
import { IdType, TaskCreationType, TaskUpdateType } from "../schema/schema";
import {
  createTaskService,
  deleteTaskService,
  updateTaskService,
} from "../database/tasks/tasks.services";
import AppError from "../utils/appError";

export const CreateTaskHandler = async (
  req: Request<{}, {}, TaskCreationType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await createTaskService(req.body);
    res.status(201).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateTaskHandler = async (
  req: Request<IdType, {}, TaskUpdateType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await updateTaskService(req.params.id, req.body);
    if (!task) {
      return next(new AppError(404, "Task not found"));
    }
    res.status(201).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTaskHandler = async (
  req: Request<IdType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await deleteTaskService(req.params.id);
    if (!task) {
      return next(new AppError(404, "Task not found"));
    }
    res.status(201).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
