import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

import { Car } from '../infra/typeorm/entities/Cars';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByPlate(license_plate: string): Promise<Car>;
  findAvailable(
    name?: string,
    category_id?: string,
    brand?: string,
  ): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
}
