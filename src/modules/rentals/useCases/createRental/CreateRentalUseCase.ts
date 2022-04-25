import { ICreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { AppError } from '@shared/errors/AppError';

export class CreateRentalUseCase {
  constructor(private rentalsRepository: RentalsRepository) {}
  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<void> {
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
  }
}
