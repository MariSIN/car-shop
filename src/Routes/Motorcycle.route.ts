import { Router } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.controller';
import idErrors from '../middlewares/idError';

const motoRoute = Router();

const route = '/motorcycles';
const routeId = '/motorcycles/:id';

motoRoute.post(route, (req, res, next) => 
  new MotorcycleController(req, res, next).create());

motoRoute.get(route, (req, res, next) => 
  new MotorcycleController(req, res, next).getAll());
  
motoRoute.get(routeId, idErrors(async (req, res, next) =>
  new MotorcycleController(req, res, next).getById()));

motoRoute.put(routeId, idErrors(async (req, res, next) =>
  new MotorcycleController(req, res, next).update()));

motoRoute.delete(routeId, idErrors(async (req, res, next) =>
  new MotorcycleController(req, res, next).deleteMotorcycle()));

export default motoRoute;