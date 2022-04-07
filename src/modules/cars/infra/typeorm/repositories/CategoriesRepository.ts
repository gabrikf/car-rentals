import { getRepository, Repository } from 'typeorm';

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const categoryAlreadyExist = await this.repository.findOne({ name });
    return categoryAlreadyExist;
  }
}
