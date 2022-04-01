import { ICategoryRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}
  execute({ name, description }: IRequest) {
    const nameAlreadyExist = this.categoryRepository.findByName(name);
    if (nameAlreadyExist) {
      throw new Error('This category is already being used');
    }
    this.categoryRepository.create({ name, description });
  }
}
