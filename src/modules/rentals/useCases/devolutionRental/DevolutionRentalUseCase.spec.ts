import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalRepositoryInMemory } from '@modules/rentals/repositories/InMemory/RentalRepositoryInMemory';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

let rentalRepository: IRentalRepository;
let carsRepository: ICarsRepository;
let devolutionRentalUseCase: DevolutionRentalUseCase;

describe('DevolutionRentalUseCase', () => {
  beforeEach(() => {
    // rentalRepository = new RentalRepositoryInMemory();
    // carsRepository = new CarsRepositoryInMemory();
    // // dateProvider
    // // devolutionRentalUseCase = new DevolutionRentalUseCase(
    // //   rentalRepository,
    // //   carsRepository,
    // // );
  });
  it('should be true', () => {
    expect(true).toBe(true);
  });
});
