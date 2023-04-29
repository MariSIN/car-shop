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
      describe('Quando o ID...', function () {
        async function testGetCarById(id: string, expectedErrorMessage: string) {
          sinon.stub(Model, 'findById').resolves(null);
      
          try {
            const service = new CarService();
            await service.getCarById(id);
          } catch (error) {
            expect((error as Error).message).to.be.equal(expectedErrorMessage);
          }
        }

        it('não existir retorna { message: "Car not found" }', async function () {
          testGetCarById('644ab6488595820219e25810', 'Car not found');
        });
      
        it(
          'estiver com o formato incorreto retorna { message: "Invalid mongo id" }',
          async function () {
            testGetCarById('asdq12364', 'Invalid mongo id');
          },
        );

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
      describe('Quando o ID...', function () {
        async function testUpdateCar(id: string, expectedErrorMessage: string) {
          sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
          try {
            const service = new CarService();
            await service.updateCar(id, carInput);
          } catch (error) {
            expect((error as Error).message).to.be.equal(expectedErrorMessage);
          }
        }
        it('não existir retorna { message: "Car not found" }', async function () {
          testUpdateCar('644ab6488595820219e25810', 'Car not found');
        });
        
        it(
          'estiver com o formato incorreto retorna { message: "Invalid mongo id" }',
          async function () {
            testUpdateCar('asdq12364', 'Invalid mongo id');
          },
        );

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
});
