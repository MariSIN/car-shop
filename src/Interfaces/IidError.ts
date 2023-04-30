import { NextFunction, Request, Response } from 'express';

export default interface IidError{
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}