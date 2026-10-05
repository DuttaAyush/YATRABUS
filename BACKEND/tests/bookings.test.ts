import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/prisma';
import { getUserAuthHeader, cleanupTestData } from './helpers/testUtils';

describe('Bookings API (/api/bookings)', () => {
  let sampleTripId: string;

  beforeAll(async () => {
    const trip = await prisma.trip.findFirst();
    sampleTripId = trip?.id || '39d12f90-78e9-48e3-a036-15b2bf6f97e5';
  });

  afterAll(async () => {
    try {
      await prisma.busBooking.deleteMany({
        where: { id: { startsWith: 'TEST-BK-' } },
      });
    } catch {}
    await cleanupTestData();
  });

  describe('GET /api/bookings/seats', () => {
    it('should fail with 400 when neither tripId nor busId is supplied', async () => {
      const res = await request(app).get('/api/bookings/seats');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('required');
    });

    it('should return booked and held seats for a valid trip', async () => {
      const res = await request(app)
        .get('/api/bookings/seats')
        .query({ tripId: sampleTripId });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('bookedSeats');
      expect(Array.isArray(res.body.data.bookedSeats)).toBe(true);
    });
  });

  describe('POST /api/bookings/hold', () => {
    it('should fail with 400 if selectedSeats is empty or invalid', async () => {
      const res = await request(app)
        .post('/api/bookings/hold')
        .send({ tripId: sampleTripId, selectedSeats: [] });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should acquire temporary seat hold for checkout', async () => {
      const lockHolderId = 'client-session-test-01';
      const res = await request(app)
        .post('/api/bookings/hold')
        .send({
          tripId: sampleTripId,
          selectedSeats: ['Z98'],
          lockHolderId,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.heldSeats).toContain('Z98');
    });

    it('should fail with 409 if another client attempts to hold the same seat', async () => {
      const res = await request(app)
        .post('/api/bookings/hold')
        .send({
          tripId: sampleTripId,
          selectedSeats: ['Z98'],
          lockHolderId: 'rival-client-session-02',
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/bookings/release', () => {
    it('should release held seats cleanly', async () => {
      const res = await request(app)
        .post('/api/bookings/release')
        .send({
          tripId: sampleTripId,
          selectedSeats: ['Z98'],
          lockHolderId: 'client-session-test-01',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('POST /api/bookings (Create Booking)', () => {
    it('should fail with 401 when not authenticated', async () => {
      const res = await request(app)
        .post('/api/bookings')
        .send({ tripId: sampleTripId, selectedSeats: ['Z1'] });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should fail with 400 when selectedSeats is missing', async () => {
      const res = await request(app)
        .post('/api/bookings')
        .set(getUserAuthHeader())
        .send({ tripId: sampleTripId });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should successfully confirm booking with valid details', async () => {
      const uniqueSeat = `T${Math.floor(100 + Math.random() * 800)}`;
      const res = await request(app)
        .post('/api/bookings')
        .set(getUserAuthHeader())
        .send({
          tripId: sampleTripId,
          selectedSeats: [uniqueSeat],
          totalAmount: 850,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.booking).toHaveProperty('id');
      expect(res.body.booking.seatNumbers).toContain(uniqueSeat);
    });
  });
});
