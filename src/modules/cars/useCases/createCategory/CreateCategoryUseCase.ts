import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const nameAlreadyExist = await this.categoryRepository.findByName(name);
    if (nameAlreadyExist) {
      throw new Error('This category is already being used');
    }
    this.categoryRepository.create({ name, description });
  }
}
