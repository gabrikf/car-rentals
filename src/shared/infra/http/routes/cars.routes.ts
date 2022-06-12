import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCarUseCase/CreateCarController';
import { CreateSpecificationCarController } from '@modules/cars/useCases/createSpecificationCar/CreateSpecificationCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadImageCarController } from '@modules/cars/useCases/uploadImageCar/UploadImageCarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthentitedec';

const upload = multer(uploadConfig);

export const carRouter = Router();

const createCarController = new CreateCarController();
const uploadImageCarController = new UploadImageCarController();
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

carRouter.post(
  '/images/:id',
  ensureAuthenticated,
  upload.array('images'),
  uploadImageCarController.handle,
);

carRouter.get('/available', listAvailableCarsController.handle);
