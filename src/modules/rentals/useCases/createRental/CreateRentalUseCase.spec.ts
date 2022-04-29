import dayjs from 'dayjs';

import { RentalRepositoryInMemory } from '@modules/rentals/repositories/InMemory/RentalRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayJsDateProvider;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;
describe('Create Rental', () => {
  const dayPlusDay = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
    );
  });
  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '123123',
      expect_return_date: dayPlusDay,
      user_id: '123123',
    });
    expect(rental).toHaveProperty('car_id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental when car_id is being used for a rent', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '123123',
        expect_return_date: dayPlusDay,
        user_id: '123123',
      });
      const rental = await createRentalUseCase.execute({
        car_id: '123123',
        expect_return_date: dayPlusDay,
        user_id: '12312',
      });
      expect(rental).toHaveProperty('car_id');
      expect(rental).toHaveProperty('start_date');
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new rental when user_id is with an open rent', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12312',
        expect_return_date: dayPlusDay,
        user_id: '123123',
      });
      const rental = await createRentalUseCase.execute({
        car_id: '123123',
        expect_return_date: dayPlusDay,
        user_id: '123123',
      });
      expect(rental).toHaveProperty('car_id');
      expect(rental).toHaveProperty('start_date');
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a rent with less then 24h foreseen', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '123123',
        expect_return_date: dayjs().add(10, 'hours').toDate(),
        user_id: '123123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
