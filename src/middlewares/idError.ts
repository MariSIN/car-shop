import { NextFunction, Request, Response } from 'express';
import CustomError from '../Interfaces/CustomError';
import IidError from '../Interfaces/IidError';
import statusCode from '../helpers/statusCode';

export default function IdErrors(fn: IidError) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (error: unknown) {
      const err = error as CustomError;
      if (err.statusCode === 404 || err.statusCode === 422) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(statusCode.internalServerError).json({ message: err.message });
      }
    }
  };
}
