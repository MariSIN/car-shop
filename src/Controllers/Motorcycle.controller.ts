import { NextFunction, Request, Response } from 'express';
import CustomError from '../Interfaces/CustomError';
import IErrorResponse from '../Interfaces/IErrorResponse';
import ISuccessResponse from '../Interfaces/ISucessResponseMotorcycle';
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

  public errorResponse: IErrorResponse = (stt, message) => this.res.status(stt).json({ message });

  public sucssesResponse: ISuccessResponse = (stt, obj) => this.res.status(stt).json(obj);

  public async create() {
    try {
      const newMoto = await this.service.addMoto(this.req.body);
      this.sucssesResponse(statusCode.created, newMoto);
    } catch (error) {
      const err = (error as CustomError);
      this.errorResponse(err.statusCode, err.message);
    }
  }

  public async getAll() {
    try {
      const motorcycles = await this.service.getAllMotorcyles(); 
      this.sucssesResponse(statusCode.ok, motorcycles);
    } catch (error) {
      const err = (error as CustomError);
      this.errorResponse(err.statusCode, err.message);
    }
  }

  public async getById() {
    const { id } = this.req.params;

    try {
      const motorcycle = await this.service.getMotorcyleById(id);
      this.sucssesResponse(statusCode.ok, motorcycle);
    } catch (error: unknown) {
      const err = (error as CustomError);
      
      if (err.statusCode === 404) {
        this.errorResponse(err.statusCode, err.message);
      } else if (err.statusCode === 422) {
        this.errorResponse(err.statusCode, err.message);
      } else {
        this.errorResponse(err.statusCode, err.message);
      }
    }
  }
}