import { SpecficationRepository } from '../../repositories/implementations/SpecificationRepository';
import { CreateCategoryController } from '../createCategory/CreateCategoryController';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationRepository = SpecficationRepository.getInstance();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository,
);

export const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);
