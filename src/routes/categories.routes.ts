import { Router } from 'express';
import multer from 'multer';

import { creteCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategories';

export const categoriesRouter = Router();

const upload = multer({
  dest: './tmp',
});

categoriesRouter.post('/', (request, response) => {
  creteCategoryController.handle(request, response);
});

categoriesRouter.get('/', (request, response) => {
  listCategoryController.handle(request, response);
});

categoriesRouter.post('/import', upload.single('file'), (request, response) => {
  importCategoryController.handle(request, response);
});
