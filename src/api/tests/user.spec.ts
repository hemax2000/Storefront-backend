import supertest from 'supertest';
import express from 'express';

const token: string = process.env.TOKEN_TEST as string;
const app = express();
const request = supertest(app);

  it('gets all users api endpoint', async (done) => {
    const res = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        firstname: 'eyong',
        lastname: 'kevin',
        password: 'thisisenow'
      }
    ]);
    done();
  });
  it('gets user by id api endpoint', async (done) => {
    const res = await request
      .get('/users/1')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      firstname: 'eyong',
      lastname: 'kevin',
      password: 'thisisenow'
    });
    done();
  });
  it('create user api endpoint', async (done) => {
    const res = await request
      .post('/users')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body.auth).toEqual(true);
    expect(res.body.token).toBeDefined();
    done();
  });
  it('delets a user api endpoint', async (done) => {
    const res = await request
      .delete('/users/1')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      firstname: 'eyong',
      lastname: 'kevin',
      password: 'thisisenow'
    });
    done();
  });
