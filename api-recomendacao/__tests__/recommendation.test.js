import request from 'supertest';
import app from '../src/app';

describe('Obtendo a lista de recomendações', ()=> {

  it('Obtendo a lista de recomendações sem maxProducts', async () => {
    const response = await request(app).get(`/recommendation`);
    expect(response.status).toBe(200);
  });

    it('Obtendo a lista de recomendações com maxProducts', async () => {
    const response = await request(app).get(`/recommendation?maxProducts=20`);
    expect(response.status).toBe(200);
  });

  afterAll(async done => {
    done();
  });
});