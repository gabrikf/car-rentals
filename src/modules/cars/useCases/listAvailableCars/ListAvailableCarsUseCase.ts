import { inject, injectable } from 'tsyringe';
import { validate as isValidUUID } from 'uuid';

import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ name, category_id, brand }: IListCarsDTO): Promise<Car[]> {
    if (category_id && !isValidUUID(category_id)) {
      throw new AppError('The category id must be an uuid string');
    }
    const cars = await this.carsRepository.findAvailable(
      name,
      category_id,
      brand,
    );

    return cars;
  }
}
