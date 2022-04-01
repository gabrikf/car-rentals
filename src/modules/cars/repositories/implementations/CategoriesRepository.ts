import { Category } from '../../models/Category';
import {
  ICreateCategoryDTO,
  ICategoryRepository,
} from '../ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  private categories: Category[];

  private static INSTANCE: ICategoryRepository;

  private constructor() {
    this.categories = [];
  }
  public static getInstance(): ICategoryRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new CategoryRepository();
    }
    return this.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string) {
    const categoryAlreadyExist = this.categories.find(
      (category) => category.name === name,
    );
    return categoryAlreadyExist;
  }
}
