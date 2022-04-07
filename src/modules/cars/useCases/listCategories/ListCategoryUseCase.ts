import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';

@injectable()
export class ListCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}
  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
