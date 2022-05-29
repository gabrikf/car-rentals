import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IDevolutionDTO } from '@modules/rentals/dtos/IDevolutionDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute({ id, user_id }: IDevolutionDTO): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const { fine_amount, daily_rate } = await this.carsRepository.findById(
      rental.car_id,
    );
    if (!rental) {
      throw new AppError('This rental does not exist.');
    }
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow(),
    );

    if (daily <= 0) {
      daily = 1;
    }
    const delay = this.dateProvider.compareInDays(
      rental.expect_return_date,
      this.dateProvider.dateNow(),
    );

    let total = 0;
    console.log(delay);
    if (delay > 0) {
      total = delay * fine_amount;
    }
    total += daily_rate * daily;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(rental.car_id, true);
    return rental;
  }
}
