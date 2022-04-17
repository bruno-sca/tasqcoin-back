import request from 'supertest';
import { Connection } from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/User';
import createConnection from '@shared/infra/typeorm';
import { authUser, createUser } from '@utils/test';

import { app } from '../../../../app';

let connection: Connection;

let user1: User;
let userToken: string;

let user2: User;

describe('Get User Info Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    user1 = await createUser(
      {
        name: 'Test Name 1',
        email: 'test1@email.com',
        password: 'pass1',
      },
      connection
    );

    userToken = await authUser({
      email: user1.email,
      password: user1.password,
    }).then(({ token }) => token);

    delete user1.balance;
    delete user1.password;

    user2 = await createUser(
      {
        name: 'Test Name 2',
        email: 'test2@email.com',
        password: 'pass2',
      },
      connection
    );

    delete user2.balance;
    delete user2.password;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to get user info', async () => {
    const response = await request(app)
      .get('/users')
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(user1);
  });

  it('Should be able to get user info by query params', async () => {
    const response = await request(app)
      .get('/users')
      .query({ id: user2.id })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(user2);
  });

  it('Should not be able to get user info', async () => {
    const response = await request(app)
      .get('/users')
      .query({ id: 'fake id' })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(response.status).toBe(400);
    expect(response.body).not.toMatchObject(user2);
  });
});
