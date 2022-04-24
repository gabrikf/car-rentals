import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationRepository } from '../ISpecificationRepository';

export class SpecificationsRepositoryInMemory
  implements ISpecificationRepository
{
  specifications: Specification[] = [];
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });
    this.specifications.push(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name,
    );
  }
  async list(): Promise<Specification[]> {
    return this.specifications;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specificationIds = this.specifications.filter((specification) =>
      ids.includes(specification.id),
    );
    return specificationIds;
  }
}
