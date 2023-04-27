import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM.model';

export default class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },      
    });
    super(schema, 'Car');
  }

  public async getAllCars(): Promise<ICar[]> {
    return this.model.find();
  }

  public async getCarById(id: string): Promise<ICar | null> { 
    return this.model.findById(id);
  }

  public async updateCar(car: ICar): Promise <ICar | null> {
    const filter = { id: car.id };
    const update = { $set: car };
    const options = { new: true };
    return this.model.findOneAndUpdate(filter, update, options);
  }
}