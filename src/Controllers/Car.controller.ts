import { NextFunction, Request, Response } from 'express';
import CustomError from '../Interfaces/CustomError';
import CarService from '../Services/Car.service';
import statusCode from '../helpers/statusCode';
import ResponseHandler from '../middlewares/responseHandler';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;
  private responseHandler: ResponseHandler;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
    this.responseHandler = new ResponseHandler(res);
  }

  public async create() {
    try {
      const newCar = await this.service.addCar(this.req.body);
      this.responseHandler.successResponse(statusCode.created, newCar);
    } catch (error) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(statusCode.badRequest, err.message);
    }
  }

  public async getAll() {
    try {
      const cars = await this.service.getAllCars();      
      this.responseHandler.successResponse(statusCode.ok, cars);
    } catch (error) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(statusCode.badRequest, err.message);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    
    try {
      const car = await this.service.getCarById(id);
      this.responseHandler.successResponse(statusCode.ok, car);
    } catch (error: unknown) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(err.statusCode, err.message);
    }
  }

  public async update() {
    const { id } = this.req.params; 

    try {
      const car = await this.service.updateCar(id, this.req.body);
      this.responseHandler.successResponse(statusCode.ok, car);
    } catch (error: unknown) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(err.statusCode, err.message);
    }
  }

  public async deleteCar() {
    const { id } = this.req.params; 

    try {
      const car = await this.service.deleteCar(id);
      this.responseHandler.successResponse(statusCode.ok, car);
    } catch (error: unknown) {
      const err = (error as CustomError);
      this.responseHandler.errorResponse(err.statusCode, err.message);
    }
  }
}