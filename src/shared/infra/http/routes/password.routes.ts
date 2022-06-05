import { Router } from 'express';

import { SendMailForgotPasswordController } from '@modules/accounts/useCases/sendMailForgetPassword/SendMailForgotPasswordController';

export const passwordRouter = Router();

const sendMailForgotPasswordController = new SendMailForgotPasswordController();

passwordRouter.post('/forgot', sendMailForgotPasswordController.handle);
