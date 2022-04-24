import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

export interface ICarImageRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}
