import Router from 'express';

import { authenticateRouter } from './authenticate.routes';
import { carRouter } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { passwordRouter } from './password.routes';
import { rentalRouter } from './rental.routes';
import { specificationRouter } from './specifications.routes';
import { userRouter } from './users.routes';

export const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specification', specificationRouter);
router.use('/users', userRouter);
router.use(authenticateRouter);
router.use('/cars', carRouter);
router.use('/rentals', rentalRouter);
router.use('/password', passwordRouter);
