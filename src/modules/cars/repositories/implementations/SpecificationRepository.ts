import { Specification } from '../../models/Specification';
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository';

export class SpecficationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  private static INSTANCE: ISpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): ISpecificationRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new SpecficationRepository();
    }
    return this.INSTANCE;
  }

  create({ name, description }: ISpecificationDTO): void {
    const speficication = new Specification();

    Object.assign(speficication, {
      name,
      description,
      createdAt: new Date(),
    });
    this.specifications.push(speficication);
  }
  findByName(name: string): Specification {
    return this.specifications.find(
      (specification) => specification.name === name,
    );
  }
  list(): Specification[] {
    return this.specifications;
  }
}
