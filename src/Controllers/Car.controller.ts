import { NextFunction, Request, Response } from 'express';
import CustomError from '../Interfaces/CustomError';
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

  public async create() {
    try {
      const newCar = await this.service.addCar(this.req.body);
      return this.res.status(statusCode.created).json(newCar);
    } catch (error) {
      return this.res.status(statusCode.badRequest).json('invalids fields');
    }
  }

  public async getAll() {
    const cars = await this.service.getAllCars();      
    try {
      return this.res.status(statusCode.ok).json(cars);
    } catch (error) {
      return this.res.status(500).json({ message: error });
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getCarById(id);
      return this.res.status(statusCode.ok).json(car);
    } catch (error: unknown) {
      if ((error as CustomError).statusCode === 404) {
        this.res.status(statusCode.notFound).json({ message: (error as CustomError).message });
      } else if ((error as CustomError).statusCode === 422) {
        this.res.status(statusCode.unprocessableEntity).json({ message: (error as CustomError)
          .message });
      } else {
        this.res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  public async update() {
    const { id } = this.req.params;

    try {
      const car = await this.service.updateCar(id, this.req.body);
      this.res.status(statusCode.ok).json(car);
    } catch (error: unknown) {
      if ((error as CustomError).statusCode === 404) {
        this.res.status(statusCode.notFound).json({ message: (error as CustomError).message });
      } else if ((error as CustomError).statusCode === 422) {
        this.res.status(statusCode.unprocessableEntity).json({ message: (error as CustomError)
          .message });
      } else {
        this.res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}