import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import createConnection from '@shared/infra/typeorm';

import '@shared/container';
import upload from '@config/upload';

import setupSwagger from '../../../swagger.json';
import { errorHandler } from './middlewares/errorHandler';
import { router } from './routes';

createConnection();

const app = express();

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(setupSwagger));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(errorHandler);

export { app };
