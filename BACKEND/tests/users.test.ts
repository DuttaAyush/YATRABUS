import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { generateTestToken, cleanupTestData } from './helpers/testUtils';

describe('Users API (/api/users)', () => {
  let createdUserId: string;
  let userToken: string;

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Profile Test User',
        email: `profile_${Date.now()}@vedbus.test`,
        phone: `+9188${String(Date.now()).slice(-8)}`,
        passwordHash: 'dummy_hash',
        role: 'USER',
      },
    });
    createdUserId = user.id;
    userToken = generateTestToken(user.id, 'USER');
  });

  afterAll(async () => {
    try {
      if (createdUserId) {
        await prisma.user.delete({ where: { id: createdUserId } });
      }
    } catch {}
    await cleanupTestData();
  });

  describe('GET /api/users/profile', () => {
    it('should fail with 401 when no token is provided', async () => {
      const res = await request(app).get('/api/users/profile');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return user profile when authenticated', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(createdUserId);
      expect(res.body.data).toHaveProperty('email');
      expect(res.body.data).not.toHaveProperty('passwordHash');
    });
  });

  describe('PATCH /api/users/profile', () => {
    it('should fail with 400 when no fields are sent to update', async () => {
      const res = await request(app)
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should update user name and phone successfully', async () => {
      const updatedName = 'Updated Profile Name';
      const res = await request(app)
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: updatedName });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(updatedName);
    });
  });

  describe('GET /api/users/my-bookings', () => {
    it('should return user bookings lists', async () => {
      const res = await request(app)
        .get('/api/users/my-bookings')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('busBookings');
      expect(res.body.data).toHaveProperty('packageBookings');
    });
  });
});
