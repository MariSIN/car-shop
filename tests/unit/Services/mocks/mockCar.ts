import Car from '../../../../src/Domains/Car';
import ICar from '../../../../src/Interfaces/ICar';

export const carInput: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

export const carOutput : Car = new Car({
  id: '64499232f75a1d20be2cd47d',
  ...carInput,
});

export const carList : ICar[] = [
  {
    id: '644ab6488595820219e25898',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    status: true,
    buyValue: 39.000,
    doorsQty: 2,
    seatsQty: 5,
  },
  {
    id: '644ab65a8595820219e2589c',
    model: 'Gol',
    year: 2010,
    color: 'White',
    status: false,
    buyValue: 25.000,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '644ab6688595820219e258a0',
    model: 'Jeep',
    year: 1998,
    color: 'Red',
    status: true,
    buyValue: 20.000,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '644ab8d98595820219e258a2',
    model: 'fusca',
    year: 1990,
    color: 'Blue',
    status: true,
    buyValue: 10.000,
    doorsQty: 2,
    seatsQty: 3,
  },
];

export const carInputUpdate: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'red',
  status: true,
  buyValue: 15.500,
  doorsQty: 4,
  seatsQty: 5,
};

export const idParams = '64499232f75a1d20be2cd47d';

export const carOutputUpdate = new Car({
  id: '64499232f75a1d20be2cd47d',
  ...carInputUpdate,
});