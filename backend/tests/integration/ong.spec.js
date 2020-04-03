const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
});

  afterAll(async() => {
    await connection.destroy();
});
  it('should be abble to create a new ONG', async () => {
    const response = await request(app)
    .post('/ongs')
    .send({
        name: "Francisco de Assis2",
        email: "contato@afa.com.br",
        whatsapp: "999999999",
        city: "Mococa",
        uf: "SP"
    });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});