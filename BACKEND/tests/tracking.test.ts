import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { cleanupTestData } from './helpers/testUtils';

describe('Tracking API (/api/tracking)', () => {
  let sampleTripId: string;

  beforeAll(async () => {
    const trip = await prisma.trip.findFirst();
    sampleTripId = trip?.id || '39d12f90-78e9-48e3-a036-15b2bf6f97e5';
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  it('GET /api/tracking/:tripId - should return 404 for nonexistent trip', async () => {
    const res = await request(app).get('/api/tracking/nonexistent-trip-999');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/tracking/:tripId - should return progress and metadata for valid trip', async () => {
    const res = await request(app).get(`/api/tracking/${sampleTripId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('progressPercentage');
    expect(res.body.data).toHaveProperty('busPlate');
    expect(res.body.data).toHaveProperty('origin');
    expect(res.body.data).toHaveProperty('destination');
  });
});
