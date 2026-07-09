import { Router } from 'express';
import { body, param, query } from 'express-validator';
import * as reservationController from '../controllers/reservation.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get user reservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reservations
 */
router.get(
  '/',
  [
    query('status').optional(),
    query('page').optional().isInt({ min: 1 }),
  ],
  validate,
  reservationController.getReservations
);

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Reservation created successfully
 */
router.post(
  '/',
  [
    body('branchId').isUUID(),
    body('date').isISO8601(),
    body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('guestCount').isInt({ min: 1, max: 50 }),
  ],
  validate,
  reservationController.createReservation
);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Get reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation details
 */
router.get(
  '/:id',
  [param('id').isUUID()],
  validate,
  reservationController.getReservationById
);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Reservation updated
 */
router.put(
  '/:id',
  [param('id').isUUID()],
  validate,
  reservationController.updateReservation
);

/**
 * @swagger
 * /api/reservations/{id}/cancel:
 *   post:
 *     summary: Cancel reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation cancelled
 */
router.post(
  '/:id/cancel',
  [param('id').isUUID()],
  validate,
  reservationController.cancelReservation
);

// Admin routes
router.use(authenticate, authorize('ADMINISTRATOR', 'MANAGER'));

/**
 * @swagger
 * /api/reservations/all:
 *   get:
 *     summary: Get all reservations (Admin)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All reservations
 */
router.get('/all', reservationController.getAllReservations);

/**
 * @swagger
 * /api/reservations/{id}/confirm:
 *   post:
 *     summary: Confirm reservation (Admin)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation confirmed
 */
router.post(
  '/:id/confirm',
  [param('id').isUUID()],
  validate,
  reservationController.confirmReservation
);

export default router;
