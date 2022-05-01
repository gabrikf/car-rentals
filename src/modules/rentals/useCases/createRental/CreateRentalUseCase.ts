import { inject, injectable } from 'tsyringe';

import { ICreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute({
    car_id,
    expect_return_date,
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

    const compare = this.dateProvider.compare(
      this.dateProvider.dateNow(),
      expect_return_date,
    );

    if (compare < minTimeToRent) {
      throw new AppError('Invalid minimum time to rent');
    }
    const rental = await this.rentalsRepository.create({
      car_id,
      expect_return_date,
      user_id,
    });
    return rental;
  }
}
