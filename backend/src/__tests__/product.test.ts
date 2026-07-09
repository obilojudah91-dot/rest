import request from 'supertest';
import app from '../app';

describe('Products API', () => {
  it('returns a list of available products', async () => {
    const res = await request(app).get('/api/products').expect(200);

    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('products');
    expect(Array.isArray(res.body.data.products)).toBe(true);
    expect(res.body.data.products.length).toBeGreaterThan(0);
  });
});
