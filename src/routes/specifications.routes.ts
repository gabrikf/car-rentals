import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthentitedec';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';

export const specificationRouter = Router();

const listSpecificationsController = new ListSpecificationsController();
const createSpecificationController = new CreateSpecificationController();

specificationRouter.get(
  '/',
  ensureAuthenticated,
  listSpecificationsController.handle,
);

specificationRouter.post('/', createSpecificationController.handle);
