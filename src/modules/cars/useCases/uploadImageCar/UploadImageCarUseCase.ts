import { inject, injectable } from 'tsyringe';

import { IImageCarDTO } from '@modules/cars/dtos/IImageCarDTO';
import { ICarImageRepository } from '@modules/cars/repositories/ICarImageRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

@injectable()
export class UploadImageCarUseCase {
  constructor(
    @inject('CarImageRepository')
    private carImageRepository: ICarImageRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  async execute({ car_id, image_name }: IImageCarDTO): Promise<void> {
    image_name.map(async (image) => {
      await this.carImageRepository.create(car_id, image);
      await this.storageProvider.save(image, 'cars');
    });
  }
}
