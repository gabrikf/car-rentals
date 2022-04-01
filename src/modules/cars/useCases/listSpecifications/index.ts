import { SpecficationRepository } from '../../repositories/implementations/SpecificationRepository';
import { ListSpecificationsController } from './ListSpecificationsController';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

const specificationRepository = SpecficationRepository.getInstance();

const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationRepository,
);

export const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsUseCase,
);
