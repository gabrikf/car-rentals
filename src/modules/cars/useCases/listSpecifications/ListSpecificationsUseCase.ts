import { Specification } from '../../models/Specification';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

export class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}
  execute(): Specification[] {
    const specifications = this.specificationsRepository.list();
    return specifications;
  }
}
