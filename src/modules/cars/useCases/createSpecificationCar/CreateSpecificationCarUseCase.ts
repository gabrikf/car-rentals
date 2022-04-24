import { inject, injectable } from 'tsyringe';

import { ICreateSpecificationCarDTO } from '@modules/cars/dtos/ICreateSpecificationCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateSpecificationCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carRepository: ICarsRepository,
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository,
  ) {}
  async execute({
    car_id,
    specifications_ids,
  }: ICreateSpecificationCarDTO): Promise<Car> {
    const carExist = await this.carRepository.findById(car_id);
    if (!carExist) {
      throw new AppError('This car does not exist');
    }
    const specifications = await this.specificationsRepository.findByIds(
      specifications_ids,
    );
    carExist.specification = specifications;

    await this.carRepository.create(carExist);
    return carExist;
  }
}
