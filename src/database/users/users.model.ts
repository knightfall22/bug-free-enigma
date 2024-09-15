import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

// Define the Mongoose schema
const userSchema = new Schema<IUser>({
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
