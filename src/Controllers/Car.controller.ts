import { NextFunction, Request, Response } from 'express';
import CustomError from '../Interfaces/CustomError';
import IErrorResponse from '../Interfaces/IErrorResponse';
import ISuccessResponse from '../Interfaces/ISucessResponseCar';
import CarService from '../Services/Car.service';
import statusCode from '../helpers/statusCode';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public errorResponse: IErrorResponse = (stt, message) => this.res.status(stt).json({ message });

  public sucssesResponse: ISuccessResponse = (stt, obj) => this.res.status(stt).json(obj);

  public async create() {
    try {
      const newCar = await this.service.addCar(this.req.body);
      this.sucssesResponse(statusCode.created, newCar);
    } catch (error) {
      const err = (error as CustomError);
      this.errorResponse(err.statusCode, err.message);
    }
  }

  public async getAll() {
    try {
      const cars = await this.service.getAllCars();      
      this.sucssesResponse(statusCode.ok, cars);
    } catch (error) {
      const err = (error as CustomError);
      this.errorResponse(err.statusCode, err.message);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    
    try {
      const car = await this.service.getCarById(id);
      this.sucssesResponse(statusCode.ok, car);
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

  public async update() {
    const { id } = this.req.params; 

    try {
      const car = await this.service.updateCar(id, this.req.body);
      this.sucssesResponse(statusCode.ok, car);
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