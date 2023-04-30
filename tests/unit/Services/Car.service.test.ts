import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/Car.service';
import {
  carInput, carInputUpdate, carList, carOutput,
  carOutputUpdate,
  idParams,
} from './mocks/mockCar';

describe('CarService', function () {
  afterEach(sinon.restore);
  const describeId = 'Quando o Id...';
  const error404 = 'não existir retorna { message: "Car not found" }';
  const error422 = 'estiver com o formato incorreto retorna { message: "Invalid mongo id" }';
  const notFoundId = '644ab6488595820219e25810';
  const invalidId = 'asdq12364';
  const messageError404 = 'Car not found';
  const messageError422 = 'Invalid mongo id';

  describe('createCarDomain', function () {
    it(
      'Deve retornar um novo objeto Car quando um objeto ICar válido é passado',
      function () {
        const service = new CarService();
        const result = service.createCarDomain(carInput);
        expect(result).to.be.instanceOf(Car);
        expect(result).to.deep.equal(new Car(carInput));
      },
    );
  
    it('Deve retornar nulo quando um objeto nulo é passado', function () {
      const service = new CarService();
      const result = service
        .createCarDomain(null);
      expect(result).to.be.equal(null);
    });
  });
  
  describe('POST /cars', function () {
    describe('Testa a função addCar', function () {
      it('Cadastrando um carro com sucesso', async function () {     
        sinon.stub(Model, 'create').resolves(carOutput);

        const service = new CarService();
        const result = await service.addCar(carInput);

        expect(result).to.be.deep.equal(carOutput);
      });
    });
  });
  
  describe('GET /cars', function () {
    describe('Testa a função getAllCars', function () {
      it('Listando todos os carros cadastrados', async function () {
        const carsOutput = carList.map((car) => new Car(car));
  
        sinon.stub(Model, 'find').resolves(carsOutput);
  
        const service = new CarService();
        const result = await service.getAllCars();
  
        expect(result).to.be.deep.equal(carsOutput);
      });
    });
  });

  describe('GET /cars/:id', function () {
    describe('Testa a função getCarById', function () {
      describe(describeId, function () {
        async function testGetCarById(id: string, expectedErrorMessage: string) {
          sinon.stub(Model, 'findById').resolves(null);
      
          try {
            const service = new CarService();
            await service.getCarById(id);
          } catch (error) {
            expect((error as Error).message).to.be.equal(expectedErrorMessage);
          }
        }

        it(error404, async function () {
          testGetCarById(notFoundId, messageError404);
        });
      
        it(error422, async function () {
          testGetCarById(invalidId, messageError422);
        });

        it('existir e estiver correto retorna o carro', async function () {
          const carsOutput = carList.map((car) => new Car(car));
          sinon.stub(Model, 'findById').resolves(carsOutput[0]);

          const service = new CarService();
          const result = await service.getCarById('644ab6488595820219e25898');
          expect(result).to.be.deep.equal(carsOutput[0]);
        });
      });
    });
  });

  describe('PUT /cars/:id', function () {
    describe('Testa a função updateCar', function () {
      describe(describeId, function () {
        async function testUpdateCar(id: string, expectedErrorMessage: string) {
          sinon.stub(Model, 'findOneAndUpdate').resolves(null);
          try {
            const service = new CarService();
            await service.updateCar(id, carInput);
          } catch (error) {
            expect((error as Error).message).to.be.equal(expectedErrorMessage);
          }
        }
        it(error404, async function () {
          testUpdateCar(notFoundId, messageError404);
        });
        
        it(error422, async function () {
          testUpdateCar(invalidId, messageError422);
        });

        it('estiver correto deve retornar o cadastro do carro atualizado', async function () {
          sinon.stub(Model, 'findById').resolves(carOutput);
          sinon.stub(Model, 'findOneAndUpdate')
            .resolves(carOutputUpdate);
        
          const service = new CarService();
          const result = await service.updateCar(idParams, carInputUpdate);
        
          expect(result).to.be.deep.equal(carOutputUpdate);
        });
      });
    });
  });

  describe('DELETE /cars/:id', function () {
    describe('Testa a função deleteCar', function () {
      describe(describeId, function () {
        async function testDeleteCar(id: string, expectedErrorMessage: string) {
          sinon.stub(Model, 'findByIdAndDelete').resolves(null);
          try {
            const service = new CarService();
            await service.updateCar(id, carInput);
          } catch (error) {
            expect((error as Error).message).to.be.equal(expectedErrorMessage);
          }
        }
        it(error404, async function () {
          testDeleteCar(notFoundId, messageError404);
        });
        
        it(error422, async function () {
          testDeleteCar(invalidId, messageError422);
        });

        it('estiver correto deve retornar o carro excluído', async function () {
          sinon.stub(Model, 'findById').resolves(carOutput);
          sinon.stub(Model, 'findByIdAndDelete')
            .resolves(carOutput);
        
          const service = new CarService();
          const result = await service.deleteCar(idParams);
        
          expect(result).to.be.deep.equal(carOutput);
        });
      });
    });
  });
});
