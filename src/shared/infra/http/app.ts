import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import createConnection from '@shared/infra/typeorm';

import '@shared/container';
import upload from '@config/upload';

import setupSwagger from '../../../swagger.json';
import { errorHandler } from './middlewares/errorHandler';
import rateLimiter from './middlewares/rateLimiter';
import { router } from './routes';

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(setupSwagger));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

export { app };
