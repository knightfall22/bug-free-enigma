import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  user: string;
}

// Define the Mongoose schema
const projectSchema = new Schema<IProject>({
  title: {
    type: "string",
    required: true,
    minlength: 2,
  },
  user: {
    type: "string",
    ref: "User",
    required: true,
  },
});

const Project = model<IProject>("Project", projectSchema);

export default Project;
