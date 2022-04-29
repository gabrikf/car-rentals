import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthentitedec';

export const rentalRouter = Router();

const createRentalController = new CreateRentalController();

rentalRouter.post('/', ensureAuthenticated, createRentalController.handle);
