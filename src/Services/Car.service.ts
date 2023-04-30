import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/Car.model';
import ErrorHandler from '../middlewares/errorHandler';

export default class CarService {
  public createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async addCar(car: ICar): Promise<Car | null> {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCars(): Promise<(Car | null)[]> {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    return cars.map(this.createCarDomain); 
  }

  public async getCarById(id: string): Promise<Car | null> {
    if (!isValidObjectId(id)) {
      throw new ErrorHandler(422, 'Invalid mongo id');
    }

    const carODM = new CarODM();
    const car = await carODM.getById(id);

    if (!car) {
      throw new ErrorHandler(404, 'Car not found');
    }

    return this.createCarDomain(car);
  }

  public async updateCar(id: string, car: ICar): Promise<Car | null> {
    await this.getCarById(id);

    const carODM = new CarODM();
    const update = await carODM.update(car);
    return this.createCarDomain(update);
  }

  public async deleteCar(id: string): Promise<Car | null> {
    await this.getCarById(id);
    
    const carODM = new CarODM();
    const deleteCar = await carODM.deleteVehicle(id);
    return this.createCarDomain(deleteCar);
  }
}