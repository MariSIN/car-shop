import Motorcycle from '../../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../../src/Interfaces/IMotorcycle';

export const motoInput = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

export const motoOutput : Motorcycle = new Motorcycle({
  id: '64499232f75a1d20be2cd47d',
  ...motoInput,
});

export const motorcyclesList : IMotorcycle[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.900,
    category: 'Street',
    engineCapacity: 1000,
  },
];

export const motoInputUpdate: IMotorcycle = {
  model: 'Honda Cbr 1000rr',
  year: 2011,
  color: 'red',
  status: true,
  buyValue: 60.500,
  category: 'Street',
  engineCapacity: 1000,
};

export const idParams = '64499232f75a1d20be2cd47d';

export const motoOutputUpdate = new Motorcycle({
  id: '64499232f75a1d20be2cd47d',
  ...motoInputUpdate,
});