export default class AppError extends Error {
  status: string;
  isOperational: boolean;

  constructor(public statusCode: number = 500, public message: string) {
    // Call the constructor of the Error class and pass the error message
    super(message);

    // Set the HTTP status based on the statusCode provided
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Set the isOperational flag to true, indicating that this error is operational
    this.isOperational = true;

    // Capture the stack trace of the error
    Error.captureStackTrace(this, this.constructor);
  }
}
