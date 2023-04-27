import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/Motorcycle';
import statusCode from '../helpers/statusCode';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    try {
      const newMoto = await this.service.addMoto(this.req.body);
      return this.res.status(statusCode.created).json(newMoto);
    } catch (error) {
      return this.res.status(statusCode.badRequest).json('invalids fields');
    }
  }
}