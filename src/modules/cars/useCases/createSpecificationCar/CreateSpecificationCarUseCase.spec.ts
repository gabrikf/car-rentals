import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateSpecificationCarUseCase } from './CreateSpecificationCarUseCase';

let createSpecificationCarUseCase: CreateSpecificationCarUseCase;
let carRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;
describe('CreateSpecificationUseCase', () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationCarUseCase = new CreateSpecificationCarUseCase(
      carRepositoryInMemory,
      specificationRepositoryInMemory,
    );
  });
  it('Should not add a specification for a car that not exist', async () => {
    const car_id = '12345';
    const specifications_ids = ['123123'];

    await expect(
      createSpecificationCarUseCase.execute({
        car_id,
        specifications_ids,
      }),
    ).rejects.toEqual(new AppError('This car does not exist'));
  });

  it('Should not add a specification for a car that not exist', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'Car1',
      description: 'description_test',
      daily_rate: 1234,
      license_plate: '33333333',
      fine_amount: 100,
      brand: 'car_brand',
      category_id: 'a0ae0ab0-30f1-4064-b326-262f248c0b61',
    });
    const specification = await specificationRepositoryInMemory.create({
      description: 'test',
      name: 'little_test',
    });
    const specifications_ids = [specification.id];

    const specificationsCar = await createSpecificationCarUseCase.execute({
      car_id: car.id,
      specifications_ids,
    });
    expect(specificationsCar).toHaveProperty('specification');
    expect(specificationsCar.specification.length).toBe(1);
  });
});
