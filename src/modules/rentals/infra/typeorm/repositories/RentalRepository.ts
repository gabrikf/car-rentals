import { getRepository, IsNull, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

import { Rental } from '../entities/Rental';

export class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    expect_return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expect_return_date,
      user_id,
      id,
      end_date,
      total,
    });
    await this.repository.save(rental);
    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rent = await this.repository.findOne({
      where: {
        car_id,
        end_date: IsNull(),
      },
    });
    return rent;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rent = await this.repository.findOne({
      where: {
        user_id,
        end_date: IsNull(),
      },
    });
    return rent;
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {
        user_id,
      },
      relations: ['car'],
    });
    return rentals;
  }
}
