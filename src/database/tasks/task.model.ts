import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  due_date: Date;
  project_id: string;
}

// Define the Mongoose schema
const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  project_id: {
    type: String,
    required: true,
  },
});

const Task = model<ITask>("Task", taskSchema);

export default Task;
