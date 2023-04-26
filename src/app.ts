import express from 'express';
import carRoute from './Routes/Car.route';
import ErrorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(carRoute);
app.use(ErrorHandler.handle);

export default app;
