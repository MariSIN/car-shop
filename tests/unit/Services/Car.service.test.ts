import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/Car.service';
import { carInput, carList, carOutput } from './mocks/mockCar';

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
      async function testGetCarById(id: string, expectedErrorMessage: string) {
        sinon.stub(Model, 'findById').resolves(null);
    
        try {
          const service = new CarService();
          await service.getCarById(id);
        } catch (error) {
          expect((error as Error).message).to.be.equal(expectedErrorMessage);
        }
      }
      
      it('caso o ID esteja incorreto', async function () {
        testGetCarById('644ab6488595820219e25810', 'Car not found');
      });
    
      it('caso o formato do ID esteja incorreto', async function () {
        testGetCarById('asdq12364', 'Invalid mongo id');
      });
    });
  });
});
