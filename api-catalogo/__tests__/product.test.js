const mongoose = require('mongoose');
import request from 'supertest';
import app from '../src/app';

describe('Obter os dados do produto', ()=> {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://linx:linx@cluster0-w73bz.mongodb.net/linx?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
  });

  it('Quando não é passado o id do produto', async () => {
    const response = await request(app).get(`/product`);
    expect(response.status).toBe(404);
  });

  it('Obter todos os dados do produto', async () => {
    const id = 12;
    const response = await request(app).get(`/product/${id}`);
    expect(response.status).toBe(200);
  });

  it('Tentar obter dados de um produto não existente', async () => {
    const id = 10;
    const response = await request(app).get(`/product/${id}`);
    expect(response.status).toBe(400);
  });

  it('Obter os dados compactos do produto', async () => {
    const id = 12;
    const response = await request(app).get(`/product/${id}?type=compact`);
    expect(response.status).toBe(200);
  });

  afterAll(async done => {
    mongoose.disconnect();
    done();
  });
});