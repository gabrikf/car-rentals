import { Router } from 'express';

import { ResetPasswordController } from '@modules/accounts/useCases/resetPassword/ResetPasswordController';
import { SendMailForgotPasswordController } from '@modules/accounts/useCases/sendMailForgetPassword/SendMailForgotPasswordController';

export const passwordRouter = Router();

const sendMailForgotPasswordController = new SendMailForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', sendMailForgotPasswordController.handle);

passwordRouter.post('/reset', resetPasswordController.handle);
