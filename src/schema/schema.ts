import { TypeOf, z } from "zod";
import { ObjectId } from "mongodb";

export const taskCreationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(2),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(10),
    status: z.enum(["pending", "in_progress", "completed"]),
    due_date: z.string({
      required_error: "Due date is required",
    }),
    project_id: z.string({
      required_error: "Project ID is required",
    }),
  }),
});

export const idSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Task ID is required",
    }),
  }),
});

export const taskUpdateSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Task ID is required",
    }),
  }),
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(2)
      .optional(),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(10)
      .optional(),
    status: z.enum(["pending", "in_progress", "completed"]).optional(),
    due_date: z
      .string({
        required_error: "Due date is required",
      })
      .optional(),
  }),
});

export const userCreateSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email address is required",
      })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  }),
});

export const createProjectSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(2),
  }),
});

export type ProjectQuery = {
  title?: string;
};

export type CreateProjectType = TypeOf<typeof createProjectSchema>["body"];
export type UserCreateType = TypeOf<typeof userCreateSchema>["body"];
export type TaskCreationType = TypeOf<typeof taskCreationSchema>["body"];
export type IdType = TypeOf<typeof idSchema>["params"];
export type TaskUpdateType = TypeOf<typeof taskUpdateSchema>["body"];
