import { Router } from 'express';

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

export const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRouter.post('/sessions', authenticateUserController.handle);
