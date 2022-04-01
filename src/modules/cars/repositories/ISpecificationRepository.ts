import { Specification } from '../models/Specification';

export interface ISpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create({ name, description }: ISpecificationDTO): void;
  findByName(name: string): Specification;
  list(): Specification[];
}
