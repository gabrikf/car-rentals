import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCarUseCase/CreateCarController';
import { CreateSpecificationCarController } from '@modules/cars/useCases/createSpecificationCar/CreateSpecificationCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthentitedec';

export const carRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createSpecificationsCarController =
  new CreateSpecificationCarController();

carRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carRouter.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationsCarController.handle,
);

carRouter.get('/available', listAvailableCarsController.handle);
