import { Response } from 'express';
import IErrorResponse from '../Interfaces/IErrorResponse';
import ISuccessResponse from '../Interfaces/ISuccessResponse';

export default class ResponseHandler {
  public errorResponse: IErrorResponse = (stt, message) =>
    this.res.status(stt).json({ message });

  public successResponse: ISuccessResponse = (stt, obj) =>
    this.res.status(stt).json(obj);

  constructor(private res: Response) {}
}
