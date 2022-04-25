import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { ICreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalRepository) {}
  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const minTimeToRent = 24; // Hours
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }
    const userUnavailable = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );
    if (userUnavailable) {
      throw new AppError('User is already using a car');
    }
    const expectReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();
    const dateNow = dayjs().utc().local().format();
    const compare = dayjs(expectReturnDateFormat).diff(dayjs(dateNow), 'hours');
    if (compare < minTimeToRent) {
      throw new AppError('Invalid minimum time to rent');
    }
    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });
    return rental;
  }
}
