import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });
  it('should list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'description_test',
      daily_rate: 1234,
      license_plate: '33333333',
      fine_amount: 100,
      brand: 'car_brand',
      category_id: 'a0ae0ab0-30f1-4064-b326-262f248c0b61',
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'description_test2',
      daily_rate: 1234,
      license_plate: '33333333',
      fine_amount: 100,
      brand: 'car_brand2',
      category_id: 'a0ae0ab0-30f1-4064-b326-262f248c0b61',
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'car_brand2',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'description_test3',
      daily_rate: 1234,
      license_plate: '33333333',
      fine_amount: 100,
      brand: 'car_brand3',
      category_id: 'a0ae0ab0-30f1-4064-b326-262f248c0b61',
    });
    const cars = await listAvailableCarsUseCase.execute({ name: 'Car3' });

    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car4',
      description: 'description_test4',
      daily_rate: 1234,
      license_plate: '33333333',
      fine_amount: 100,
      brand: 'car_brand4',
      category_id: 'a0ae0ab0-30f1-4064-b326-262f248c0b61',
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'a0ae0ab0-30f1-4064-b326-262f248c0b61',
    });

    expect(cars).toEqual([car]);
  });
});
