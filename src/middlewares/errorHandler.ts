import { NextFunction, Request, Response } from 'express';

class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  public static handle(
    error: ErrorHandler,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.status(error.statusCode).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;
