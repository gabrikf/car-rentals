import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthentitedec';

export const rentalRouter = Router();

const devolutionRentalController = new DevolutionRentalController();
const createRentalController = new CreateRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRouter.post('/', ensureAuthenticated, createRentalController.handle);
rentalRouter.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

rentalRouter.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);
