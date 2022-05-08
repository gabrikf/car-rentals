import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    brand,
    category_id,
    specification,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      brand,
      category_id,
      specification,
    });
    await this.repository.save(car);
    return car;
  }
  async findByPlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }
  async findAvailable(
    name?: string,
    category_id?: string,
    brand?: string,
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }
    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }
    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }
    const cars = await carsQuery.getMany();
    return cars;
  }
  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne(car_id);
    return car;
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id', { id })
      .execute();
  }
}
