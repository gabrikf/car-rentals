import { CategoryRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoryController } from './ListCategoryController';
import { ListCategoryUseCase } from './ListCategoryUseCase';

const categoryRepository = CategoryRepository.getInstance();

export const listCategoriesUseCase = new ListCategoryUseCase(
  categoryRepository,
);

export const listCategoryController = new ListCategoryController(
  listCategoriesUseCase,
);
