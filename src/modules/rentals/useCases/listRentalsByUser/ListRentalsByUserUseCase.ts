import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { RentalRepository } from '@modules/rentals/infra/typeorm/repositories/RentalRepository';

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: RentalRepository,
  ) {}
  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);
    return rentalsByUser;
  }
}
