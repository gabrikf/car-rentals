import { CategoryRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const categoryRepository = CategoryRepository.getInstance();

export const createCategoryUseCase = new CreateCategoryUseCase(
  categoryRepository,
);

export const creteCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);
