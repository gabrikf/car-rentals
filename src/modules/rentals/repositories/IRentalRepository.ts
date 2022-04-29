import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { ICreateRentalDTO } from '../dtos/CreateRentalDTO';

export interface IRentalRepository {
  create({
    car_id,
    expect_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}
