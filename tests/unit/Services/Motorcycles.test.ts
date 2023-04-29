import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/Motorcycle.service';
import {
  idParams, motoInput,
  motoInputUpdate, motoOutput,
  motoOutputUpdate, motorcyclesList,
} from './mocks/mockMotorcycle';

describe('MotorcycleService', function () {
  afterEach(sinon.restore);

  describe('createMotorcycleDomain', function () {
    it(
      'Deve retornar um novo objeto Motorcycle quando um objeto IMotorcycle válido é passado',
      function () {
        const service = new MotorcycleService();
        const result = service.createMotorcycleDomain(motoInput);
        expect(result).to.be.instanceOf(Motorcycle);
        expect(result).to.deep.equal(new Motorcycle(motoInput));
      },
    );
  
    it('Deve retornar nulo quando um objeto nulo é passado', function () {
      const service = new MotorcycleService();
      const result = service
        .createMotorcycleDomain(null);
      expect(result).to.be.equal(null);
    });
  });

  describe('POST /motorcycles', function () {
    describe('Testa a função addMoto', function () {
      it('Cadastrando uma moto com sucesso', async function () {
        sinon.stub(Model, 'create').resolves(motoOutput);
        const service = new MotorcycleService();
        const result = await service.addMoto(motoInput);
  
        expect(result).to.be.deep.equal(motoOutput);
      });
    });
  });

  describe('GET /motorcycles', function () {
    describe('Testa a função getAllMotorcycles', function () {
      it('Listando todas as motocicletas cadastradas', async function () {
        const motorcyclesOutput = motorcyclesList.map((moto) => new Motorcycle(moto));
        
        sinon.stub(Model, 'find').resolves(motorcyclesOutput);
        
        const service = new MotorcycleService();
        const result = await service.getAllMotorcyles();
        expect(result).to.be.deep.equal(motorcyclesOutput);
      });
    });
  });
  describe('GET /motorcycles/:id', function () {
    describe('Testa a função getMotorcyleById', function () {
      describe('Quando o ID...', function () {
        async function testGetMotorcyleById(id: string, expectedErrorMessage: string) {
          sinon.stub(Model, 'findById').resolves(null);
      
          try {
            const service = new MotorcycleService();
            await service.getMotorcyleById(id);
          } catch (error) {
            expect((error as Error).message).to.be.equal(expectedErrorMessage);
          }
        }
        it('não exixtir retorna { message: "Motorcycle not found" }', async function () {
          testGetMotorcyleById('65499232f75a1d20be2cd47d', 'Motorcycle not found');
        });

        it(
          'estiver com o formato incorreto retorna { message: "Invalid mongo id" }',
          async function () {
            testGetMotorcyleById('asdq12364', 'Invalid mongo id');
          },
        );

        it('existir e estiver correto retorna a motocileta', async function () {
          const motors = motorcyclesList.map((moto) => new Motorcycle(moto));

          sinon.stub(Model, 'findById').resolves(motors[0]);

          const service = new MotorcycleService();
          const result = await service.getMotorcyleById('644ab6488595820219e25898');
          expect(result).to.be.deep.equal(motors[0]);
        });
      });
    });
  });

  describe('PUT /cars/:id', function () {
    describe('Testa a função updateCar', function () {
      describe('Quando o ID...', function () {
        async function testUpdateMotorcycle(id: string, expectedErrorMessage: string) {
          sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
          try {
            const service = new MotorcycleService();
            await service.updateMotorcycle(id, motoInput);
          } catch (error) {
            expect((error as Error).message).to.be.equal(expectedErrorMessage);
          }
        }
        it('não existir retorna { message: "Motorcycle not found" }', async function () {
          testUpdateMotorcycle('644ab6488595820219e25810', 'Motorcycle not found');
        });
        
        it(
          'estiver com o formato incorreto retorna { message: "Invalid mongo id" }',
          async function () {
            testUpdateMotorcycle('asdq12364', 'Invalid mongo id');
          },
        );

        it('estiver correto deve retornar o cadastro da motocicleta atualizado', async function () {
          sinon.stub(Model, 'findById').resolves(motoOutput);
          sinon.stub(Model, 'findOneAndUpdate')
            .resolves(motoOutputUpdate);
        
          const service = new MotorcycleService();
          const result = await service.updateMotorcycle(idParams, motoInputUpdate);
        
          expect(result).to.be.deep.equal(motoOutputUpdate);
        });
      });
    });
  });
});