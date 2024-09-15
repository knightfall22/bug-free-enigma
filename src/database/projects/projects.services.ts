import { QueryOptions } from "mongoose";
import { CreateProjectType } from "../../schema/schema";
import Project, { IProject } from "./projects.model";

export const createProjectService = async (
  input: CreateProjectType
): Promise<IProject> => {
  return await Project.create(input);
};

// export const updateTaskService = async (
//   taskId: string,
//   updateData: TaskUpdateType
// ): Promise<IProject | null> => {
//   return Project.findByIdAndUpdate(taskId, updateData, { new: true });
// };

// export const deleteTaskService = async (
//   taskId: string
// ): Promise<IProject | null> => {
//   return Project.findByIdAndDelete(taskId);
// };

export const getProjectService = async (
  data: QueryOptions<IProject>
): Promise<IProject[]> => {
  console.log(await Project.find());

  return Project.find(data);
};
