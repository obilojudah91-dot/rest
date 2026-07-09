import { Router } from 'express';
import { body, param } from 'express-validator';
import * as paymentController from '../controllers/payment.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/payments/create-intent:
 *   post:
 *     summary: Create Stripe payment intent
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment intent created
 */
router.post(
  '/create-intent',
  [
    body('orderId').isUUID(),
    body('amount').isFloat({ min: 0 }),
  ],
  validate,
  paymentController.createPaymentIntent
);

/**
 * @swagger
 * /api/payments/confirm:
 *   post:
 *     summary: Confirm payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentIntentId:
 *                 type: string
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment confirmed
 */
router.post(
  '/confirm',
  [
    body('paymentIntentId').notEmpty(),
    body('orderId').isUUID(),
  ],
  validate,
  paymentController.confirmPayment
);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
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
 *         description: Payment details
 */
router.get(
  '/:id',
  [param('id').isUUID()],
  validate,
  paymentController.getPaymentById
);

// Admin routes
router.use(authenticate, authorize('ADMINISTRATOR', 'MANAGER'));

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments (Admin)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All payments
 */
router.get('/', paymentController.getAllPayments);

/**
 * @swagger
 * /api/payments/{id}/refund:
 *   post:
 *     summary: Refund payment (Admin)
 *     tags: [Payments]
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
 *         description: Payment refunded
 */
router.post(
  '/:id/refund',
  [param('id').isUUID()],
  validate,
  paymentController.refundPayment
);

export default router;
