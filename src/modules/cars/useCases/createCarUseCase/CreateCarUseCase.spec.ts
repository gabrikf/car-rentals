import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Creata Car Use Case', () => {
  beforeEach(() => {
    createCarsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(createCarsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'test Car',
      description: 'description test',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand test',
      category_id: 'category',
    });
    expect(car).toHaveProperty('id');
  });
  it('should not create a car with an existing plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'test Car1',
        description: 'description test',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand test',
        category_id: 'category',
      });
      await createCarUseCase.execute({
        name: 'test Car2',
        description: 'description test',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand test',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should be created with avaliable proporty as true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'test Car1',
      description: 'description test',
      daily_rate: 100,
      license_plate: 'ABC-1235',
      fine_amount: 60,
      brand: 'Brand test',
      category_id: 'category',
    });
    expect(car.available).toBe(true);
  });
});
