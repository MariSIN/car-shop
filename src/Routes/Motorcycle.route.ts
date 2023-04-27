import { Router } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.controller';

const motoRoute = Router();

motoRoute.post('/motorcycles', (req, res, next) => 
  new MotorcycleController(req, res, next).create());

export default motoRoute;