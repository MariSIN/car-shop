import { NextFunction, Request, Response } from 'express';
import CustomError from '../Interfaces/CustomError';
import MotorcycleService from '../Services/Motorcycle.service';
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
      this.responseHandler.successResponse(statusCode.created, newMoto);
    } catch (error) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(err.statusCode, err.message);
    }
  }

  public async getAll() {
    try {
      const motorcycles = await this.service.getAllMotorcyles(); 
      this.responseHandler.successResponse(statusCode.ok, motorcycles);
    } catch (error) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(err.statusCode, err.message);
    }
  }

  public async getById() {
    const { id } = this.req.params;

    try {
      const motorcycle = await this.service.getMotorcyleById(id);
      this.responseHandler.successResponse(statusCode.ok, motorcycle);
    } catch (error: unknown) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(err.statusCode, err.message);
    }
  }

  public async update() {
    const { id } = this.req.params;

    try {
      const moto = await this.service.updateMotorcycle(id, this.req.body);
      this.responseHandler.successResponse(statusCode.ok, moto);
    } catch (error: unknown) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(err.statusCode, err.message);
    }
  }

  public async deleteMotorcycle() {
    const { id } = this.req.params;

    try {
      const moto = await this.service.deleteMotorcycle(id);
      this.responseHandler.successResponse(statusCode.ok, moto);
    } catch (error: unknown) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(err.statusCode, err.message);
    }
  }
}