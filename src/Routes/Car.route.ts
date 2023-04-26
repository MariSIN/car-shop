import { Router } from 'express';
import CarController from '../Controllers/Car.controller';

const carRoute = Router();

carRoute.post('/cars', (req, res, next) => new CarController(req, res, next).create());

export default carRoute;