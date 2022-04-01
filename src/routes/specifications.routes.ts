import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';
import { listSpecificationsController } from '../modules/cars/useCases/listSpecifications';

export const specificationRouter = Router();

specificationRouter.get('/', (request, response) => {
  listSpecificationsController.handle(request, response);
});

specificationRouter.post('/', (request, response) => {
  createSpecificationController.handle(request, response);
});
