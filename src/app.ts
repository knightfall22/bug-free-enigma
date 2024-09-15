import dotenv from "dotenv";

dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AppError from "./utils/appError";
import TaskRoutes from "./routes/tasks.routes";
import ProjectRoutes from "./routes/projects.routes";
import UsersRoutes from "./routes/users.routes";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1", TaskRoutes);
app.use("/api/v1", ProjectRoutes);
app.use("/api/v1", UsersRoutes);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Welcome to NFC Suite API",
  });
});

// UNHANDLED ROUTE
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

// GLOBAL ERROR HANDLER
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  error.status = error.status || "error";
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

export default app;
