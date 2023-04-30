import { Router } from 'express';
import CarController from '../Controllers/Car.controller';
import idErrors from '../middlewares/idError';

const carRoute = Router();

const route = '/cars/';
const routeId = '/cars/:id';

carRoute.post(route, (req, res, next) => new CarController(req, res, next).create());

carRoute.get(route, (req, res, next) => new CarController(req, res, next).getAll());

carRoute.get(routeId, idErrors(async (req, res, next) =>
  new CarController(req, res, next).getById()));

carRoute.put(routeId, idErrors(async (req, res, next) =>
  new CarController(req, res, next).update()));

carRoute.delete(routeId, idErrors(async (req, res, next) =>
  new CarController(req, res, next).deleteCar()));

export default carRoute;