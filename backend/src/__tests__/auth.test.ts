import request from 'supertest';
import app from '../app';

describe('Auth API', () => {
  it('logs in seeded customer and returns token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'customer@example.com', password: 'password123' })
      .expect(200);

    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.user).toHaveProperty('email', 'customer@example.com');
  });
});
