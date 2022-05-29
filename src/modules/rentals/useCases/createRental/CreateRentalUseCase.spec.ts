import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalRepositoryInMemory } from '@modules/rentals/repositories/InMemory/RentalRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayJsDateProvider;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let car_id: string;
describe('Create Rental', () => {
  const dayPlusDay = dayjs().add(1, 'day').toDate();
  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory,
    );
    const { id } = await carsRepositoryInMemory.create({
      name: 'test Car1',
      description: 'description test',
      daily_rate: 100,
      license_plate: 'ABC-1235',
      fine_amount: 60,
      brand: 'Brand test',
      category_id: 'category',
    });
    car_id = id;
  });
  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id,
      expect_return_date: dayPlusDay,
      user_id: '123123',
    });
    expect(rental).toHaveProperty('car_id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental when car_id is being used for a rent', async () => {
    await createRentalUseCase.execute({
      car_id,
      expect_return_date: dayPlusDay,
      user_id: '123123',
    });
    await expect(
      createRentalUseCase.execute({
        car_id,
        expect_return_date: dayPlusDay,
        user_id: '12312',
      }),
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });
  it('should not be able to create a new rental when user_id is with an open rent', async () => {
    await createRentalUseCase.execute({
      car_id: '12312',
      expect_return_date: dayPlusDay,
      user_id: '123123',
    });
    await expect(
      createRentalUseCase.execute({
        car_id,
        expect_return_date: dayPlusDay,
        user_id: '123123',
      }),
    ).rejects.toEqual(new AppError('User is already using a car'));
  });
  it('should not be able to create a rent with less then 24h foreseen', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id,
        expect_return_date: dayjs().add(10, 'hours').toDate(),
        user_id: '123123',
      }),
    ).rejects.toEqual(new AppError('Invalid minimum time to rent'));
  });
});
