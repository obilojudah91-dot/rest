import request from 'supertest';
import app from '../app';

describe('Orders API', () => {
  it('creates an order for authenticated customer', async () => {
    // Login first
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'customer@example.com', password: 'password123' })
      .expect(200);

    const token = login.body.data.token as string;

    // Fetch a product
    const productsRes = await request(app).get('/api/products').expect(200);
    const product = productsRes.body.data.products[0];
    expect(product).toBeDefined();

    const orderPayload = {
      items: [
        { productId: product.id, quantity: 1, price: product.price }
      ],
      type: 'PICKUP'
    };

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderPayload)
      .expect(201);

    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data.order).toHaveProperty('id');
    expect(res.body.data.order.items.length).toBeGreaterThan(0);
  });
});
