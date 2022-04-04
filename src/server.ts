import express from 'express';
import swaggerUi from 'swagger-ui-express';

import './database';

import './shared/container';
import { router } from './routes';
import setupSwagger from './swagger.json';

const app = express();

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(setupSwagger));

app.use(router);

app.listen(3333, () => console.log('server running on port 3333'));
