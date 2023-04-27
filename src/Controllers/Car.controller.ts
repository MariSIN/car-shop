import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
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
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const newCar = await this.service.addCar(car);
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.statusCode === 404) {
        this.res.status(statusCode.notFound).json({ message: error.message });
      } else if (error.statusCode === 422) {
        this.res.status(statusCode.unprocessableEntity).json({ message: error.message });
      } else {
        this.res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}