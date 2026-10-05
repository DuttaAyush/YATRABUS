import request from 'supertest';
import { app } from '../src/app';
import { getUserAuthHeader, cleanupTestData } from './helpers/testUtils';

describe('Tour Packages API (/api/packages)', () => {
  afterAll(async () => {
    await cleanupTestData();
  });

  describe('GET /api/packages', () => {
    it('should return list of all packages', async () => {
      const res = await request(app).get('/api/packages');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      const pkg = res.body[0];
      expect(pkg).toHaveProperty('title');
      expect(pkg).toHaveProperty('category');
      expect(pkg).toHaveProperty('pricePerPerson');
    });

    it('should support category filter', async () => {
      const res = await request(app)
        .get('/api/packages')
        .query({ category: 'Spiritual' });

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      res.body.forEach((pkg: any) => {
        expect(pkg.category.toLowerCase()).toBe('spiritual');
      });
    });
  });

  describe('POST /api/packages/book', () => {
    it('should fail with 401 when not authenticated', async () => {
      const res = await request(app)
        .post('/api/packages/book')
        .send({ travelersCount: 2 });

      expect(res.status).toBe(401);
    });

    it('should fail with 400 when travelersCount or packageId is missing', async () => {
      const res = await request(app)
        .post('/api/packages/book')
        .set(getUserAuthHeader())
        .send({ travelersCount: 2 });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should successfully book a package', async () => {
      const res = await request(app)
        .post('/api/packages/book')
        .set(getUserAuthHeader())
        .send({
          packageId: 'chardham',
          travelersCount: 2,
          travelDate: '2026-11-15',
          totalAmount: 48998,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.booking).toHaveProperty('id');
      expect(res.body.booking.status).toBe('Confirmed');
    });
  });
});
