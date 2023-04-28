import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/Motorcycle.model';
import ErrorHandler from '../middlewares/errorHandler';

export default class MotorcycleService {
  public createMotorcycleDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async addMoto(moto: IMotorcycle): Promise<Motorcycle | null> {
    const motoODM = new MotorcycleODM();
    const newMoto = await motoODM.create(moto);
    return this.createMotorcycleDomain(newMoto);
  }

  public async getAllMotorcyles(): Promise<(Motorcycle | null)[]> {
    const motoODM = new MotorcycleODM();
    const motos = await motoODM.getAll();
    return motos.map(this.createMotorcycleDomain); 
  }

  public async getMotorcyleById(id: string): Promise<Motorcycle | null> {
    if (!isValidObjectId(id)) {
      throw new ErrorHandler(422, 'Invalid mongo id');
    }
    const motoODM = new MotorcycleODM();
    const moto = await motoODM.getById(id);

    if (!moto) {
      throw new ErrorHandler(404, 'Motorcycle not found');
    }

    return this.createMotorcycleDomain(moto);
  }

  public async updateMotorcycle(id: string, moto: IMotorcycle): Promise<Motorcycle | null> {
    await this.getMotorcyleById(id);
    const motoODM = new MotorcycleODM();
    const update = await motoODM.update(moto);
    return this.createMotorcycleDomain(update);
  }
}