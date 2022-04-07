import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthentitedec';

export const specificationRouter = Router();

const listSpecificationsController = new ListSpecificationsController();
const createSpecificationController = new CreateSpecificationController();

specificationRouter.get(
  '/',
  ensureAuthenticated,
  listSpecificationsController.handle,
);

specificationRouter.post('/', createSpecificationController.handle);
