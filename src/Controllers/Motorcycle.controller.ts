import { NextFunction, Request, Response } from 'express';
import CustomError from '../Interfaces/CustomError';
import MotorcycleService from '../Services/Motorcycle';
import statusCode from '../helpers/statusCode';
import ResponseHandler from '../middlewares/responseHandler';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;
  private responseHandler: ResponseHandler;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
    this.responseHandler = new ResponseHandler(res);
  }

  public async create() {
    try {
      const newMoto = await this.service.addMoto(this.req.body);
      this.responseHandler.sucssesResponse(statusCode.created, newMoto);
    } catch (error) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(err.statusCode, err.message);
    }
  }

  public async getAll() {
    try {
      const motorcycles = await this.service.getAllMotorcyles(); 
      this.responseHandler.sucssesResponse(statusCode.ok, motorcycles);
    } catch (error) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(err.statusCode, err.message);
    }
  }

  public async getById() {
    const { id } = this.req.params;

    try {
      const motorcycle = await this.service.getMotorcyleById(id);
      this.responseHandler.sucssesResponse(statusCode.ok, motorcycle);
    } catch (error: unknown) {
      const err = (error as CustomError);
      
      if (err.statusCode === 404) {
        this.responseHandler.errorResponse(err.statusCode, err.message);
      } else if (err.statusCode === 422) {
        this.responseHandler.errorResponse(err.statusCode, err.message);
      } else {
        this.responseHandler.errorResponse(err.statusCode, err.message);
      }
    }
  }

  public async update() {
    const { id } = this.req.params;

    try {
      const moto = await this.service.updateMotorcycle(id, this.req.body);
      this.responseHandler.sucssesResponse(statusCode.ok, moto);
    } catch (error: unknown) {
      const err = (error as CustomError);

      if (err.statusCode === 404) {
        this.responseHandler.errorResponse(err.statusCode, err.message);
      } else if (err.statusCode === 422) {
        this.responseHandler.errorResponse(err.statusCode, err.message);
      } else {
        this.responseHandler.errorResponse(err.statusCode, err.message);
      }
    }
  }
}