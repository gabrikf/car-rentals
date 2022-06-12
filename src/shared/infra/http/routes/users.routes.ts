import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { UserProfileController } from '@modules/accounts/useCases/userProfileUseCase/UserProfileController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthentitedec';

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

const uploadAvatar = multer(uploadConfig);

export const userRouter = Router();

userRouter.post('/', createUserController.handle);

userRouter.get('/:id', userProfileController.handle);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);
