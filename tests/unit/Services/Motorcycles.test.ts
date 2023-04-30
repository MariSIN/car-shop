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
  const describeId = 'Quando o Id...';
  const error404 = 'não existir retorna { message: "Car not found" }';
  const error422 = 'estiver com o formato incorreto retorna { message: "Invalid mongo id" }';
  const notFoundId = '644ab6488595820219e25810';
  const invalidId = 'asdq12364';
  const messageError404 = 'Car not found';
  const messageError422 = 'Invalid mongo id';

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
      describe(describeId, function () {
        async function testGetMotorcyleById(id: string, expectedErrorMessage: string) {
          sinon.stub(Model, 'findById').resolves(null);
      
          try {
            const service = new MotorcycleService();
            await service.getMotorcyleById(id);
          } catch (error) {
            expect((error as Error).message).to.be.equal(expectedErrorMessage);
          }
        }
        it(error404, async function () {
          testGetMotorcyleById(notFoundId, messageError404);
        });

        it(error422, async function () {
          testGetMotorcyleById(invalidId, messageError422);
        });

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
    describe('Testa a função updateMotorcycle', function () {
      describe(describeId, function () {
        async function testUpdateMotorcycle(id: string, expectedErrorMessage: string) {
          sinon.stub(Model, 'findOneAndUpdate').resolves(null);
          try {
            const service = new MotorcycleService();
            await service.updateMotorcycle(id, motoInput);
          } catch (error) {
            expect((error as Error).message).to.be.equal(expectedErrorMessage);
          }
        }
        it(error404, async function () {
          testUpdateMotorcycle(notFoundId, messageError404);
        });
        
        it(error422, async function () {
          testUpdateMotorcycle(invalidId, messageError422);
        });

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

  describe('DELETE /cars/:id', function () {
    describe('Testa a função deleteMotorcycle', function () {
      describe(describeId, function () {
        async function testDeleteMotorcycle(id: string, expectedErrorMessage: string) {
          sinon.stub(Model, 'findByIdAndDelete').resolves(null);
          try {
            const service = new MotorcycleService();
            await service.deleteMotorcycle(id);
          } catch (error) {
            expect((error as Error).message).to.be.equal(expectedErrorMessage);
          }
        }
        it(error404, async function () {
          testDeleteMotorcycle(notFoundId, messageError404);
        });
        
        it(error422, async function () {
          testDeleteMotorcycle(invalidId, messageError422);
        });

        it('estiver correto deve retornar a motocicleta deletada', async function () {
          sinon.stub(Model, 'findById').resolves(motoOutput);
          sinon.stub(Model, 'findByIdAndDelete')
            .resolves(motoOutput);
        
          const service = new MotorcycleService();
          const result = await service.deleteMotorcycle(idParams);
        
          expect(result).to.be.deep.equal(motoOutput);
        });
      });
    });
  });
});