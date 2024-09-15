import { QueryOptions } from "mongoose";
import { TaskCreationType, TaskUpdateType } from "../../schema/schema";
import Task, { ITask } from "./task.model";

export const createTaskService = async (
  input: TaskCreationType
): Promise<ITask> => {
  return await Task.create(input);
};

export const updateTaskService = async (
  taskId: string,
  updateData: TaskUpdateType
): Promise<ITask | null> => {
  return Task.findByIdAndUpdate(taskId, updateData, { new: true });
};

export const deleteTaskService = async (
  taskId: string
): Promise<ITask | null> => {
  return Task.findByIdAndDelete(taskId);
};

export const getTaskService = async (
  data: QueryOptions<ITask>
): Promise<ITask[]> => {
  return Task.find(data);
};

// export const getAllTasksService = async (): Promise<ITask[]> => {
//   return Task.find();
// };
