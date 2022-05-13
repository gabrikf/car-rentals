import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IDevolutionDTO } from '@modules/rentals/dtos/IDevolutionDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

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
  async execute({ id, car_id }: IDevolutionDTO): Promise<Rental> {
    const { fine_amount, daily_rate } = await this.carsRepository.findById(
      car_id,
    );
    const rental = await this.rentalsRepository.findById(id);

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow(),
    );

    if (daily <= 0) {
      daily = 1;
    }
    const delay = this.dateProvider.compareInHours(
      rental.expect_return_date,
      this.dateProvider.dateNow(),
    );

    let total = 0;

    if (delay > 0) {
      total = delay * fine_amount;
    }
    total += daily_rate * daily;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car_id, true);
    return rental;
  }
}
