import { Router } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.controller';

const motoRoute = Router();

motoRoute.post('/motorcycles', (req, res, next) => 
  new MotorcycleController(req, res, next).create());

motoRoute.get('/motorcycles', (req, res, next) => 
  new MotorcycleController(req, res, next).getAll());
  
motoRoute.get('/motorcycles/:id', (req, res, next) => 
  new MotorcycleController(req, res, next).getById());

motoRoute.put('/motorcycles/:id', (req, res, next) => 
  new MotorcycleController(req, res, next).update());

export default motoRoute;