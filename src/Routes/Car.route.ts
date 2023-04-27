import { Router } from 'express';
import CarController from '../Controllers/Car.controller';

const carRoute = Router();

carRoute.post('/cars', (req, res, next) => new CarController(req, res, next).create());
carRoute.get('/cars', (req, res, next) => new CarController(req, res, next).getAll());
carRoute.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getById());

export default carRoute;