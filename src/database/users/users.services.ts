import { QueryOptions } from "mongoose";
import { UserCreateType } from "../../schema/schema";
import User, { IUser } from "./users.model";

export const createUserService = async (
  input: UserCreateType
): Promise<IUser> => {
  return await User.create(input);
};

export const getUserService = async (
  data: QueryOptions<IUser>
): Promise<IUser[]> => {
  return User.find(data);
};
