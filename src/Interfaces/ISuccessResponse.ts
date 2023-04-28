import { Response } from 'express';
import Car from '../Domains/Car';
import Motorcycle from '../Domains/Motorcycle';

export default interface ISuccessResponse {
  (stt: number, obj: Car | Motorcycle | null | (Car | null)[] | (Motorcycle | null)[]): Response;
}
