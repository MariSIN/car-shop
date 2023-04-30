import { Router } from 'express';
import CarController from '../Controllers/Car.controller';
import idErros from '../middlewares/idError';

const carRoute = Router();

carRoute.post('/cars', (req, res, next) => new CarController(req, res, next).create());

carRoute.get('/cars', (req, res, next) => new CarController(req, res, next).getAll());

carRoute.get('/cars/:id', idErros(async (req, res, next) =>
  new CarController(req, res, next).getById()));

carRoute.put('/cars/:id', idErros(async (req, res, next) =>
  new CarController(req, res, next).update()));

carRoute.delete('/cars/:id', idErros(async (req, res, next) =>
  new CarController(req, res, next).deleteCar()));

export default carRoute;