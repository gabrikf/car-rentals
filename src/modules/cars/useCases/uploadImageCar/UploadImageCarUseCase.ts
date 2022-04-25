import { inject, injectable } from 'tsyringe';

import { IImageCarDTO } from '@modules/cars/dtos/IImageCarDTO';
import { ICarImageRepository } from '@modules/cars/repositories/ICarImageRepository';

@injectable()
export class UploadImageCarUseCase {
  constructor(
    @inject('CarImageRepository')
    private carImageRepository: ICarImageRepository,
  ) {}
  async execute({ car_id, image_name }: IImageCarDTO): Promise<void> {
    image_name.map(async (image) =>
      this.carImageRepository.create(car_id, image),
    );
  }
}
