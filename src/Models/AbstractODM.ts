import { Model, Schema, model, models } from 'mongoose';
import IVehicle from '../Interfaces/IVehicle';

export default abstract class AbstractODM<T extends IVehicle> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }
  
  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }
}
