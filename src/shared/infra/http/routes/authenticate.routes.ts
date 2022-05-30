import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

export const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
authenticateRouter.post('/sessions', authenticateUserController.handle);

authenticateRouter.post('/refreshtoken', refreshTokenController.handle);
