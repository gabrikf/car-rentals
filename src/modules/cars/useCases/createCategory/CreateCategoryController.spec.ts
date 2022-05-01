import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm/index';

let connection: Connection;
describe('CreateCategoryController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);
    await connection.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin','admin@adm.ui' ,'${password}', true, 'now()','XXXXXXXXXX')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to create a category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@adm.ui',
      password: 'admin',
    });
    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'SUV2',
        description: 'SUV, carro robusto',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(201);
  });
  it('should not be able to create a category with an existing name', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@adm.ui',
      password: 'admin',
    });
    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'SUV2',
        description: 'SUV, carro robusto',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(400);
  });
});
