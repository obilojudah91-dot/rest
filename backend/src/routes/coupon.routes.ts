import { Router } from 'express';
import { body, param } from 'express-validator';
import * as couponController from '../controllers/coupon.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

/**
 * @swagger
 * /api/coupons/validate:
 *   post:
 *     summary: Validate coupon code
 *     tags: [Coupons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               orderTotal:
 *                 type: number
 *     responses:
 *       200:
 *         description: Coupon validation result
 */
router.post(
  '/validate',
  [
    body('code').trim().notEmpty(),
    body('orderTotal').isFloat({ min: 0 }),
  ],
  validate,
  couponController.validateCoupon
);

router.use(authenticate);

// Admin routes
router.use(authorize('ADMINISTRATOR', 'MANAGER'));

/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: Get all coupons (Admin)
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of coupons
 */
router.get('/', couponController.getCoupons);

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     summary: Create coupon (Admin)
 *     tags: [Coupons]
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
 *         description: Coupon created successfully
 */
router.post(
  '/',
  [
    body('code').trim().notEmpty().toUpperCase(),
    body('discountType').isIn(['PERCENTAGE', 'FIXED']),
    body('discountValue').isFloat({ min: 0 }),
  ],
  validate,
  couponController.createCoupon
);

/**
 * @swagger
 * /api/coupons/{id}:
 *   get:
 *     summary: Get coupon by ID (Admin)
 *     tags: [Coupons]
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
 *         description: Coupon details
 */
router.get(
  '/:id',
  [param('id').isUUID()],
  validate,
  couponController.getCouponById
);

/**
 * @swagger
 * /api/coupons/{id}:
 *   put:
 *     summary: Update coupon (Admin)
 *     tags: [Coupons]
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
 *         description: Coupon updated
 */
router.put(
  '/:id',
  [param('id').isUUID()],
  validate,
  couponController.updateCoupon
);

/**
 * @swagger
 * /api/coupons/{id}:
 *   delete:
 *     summary: Delete coupon (Admin)
 *     tags: [Coupons]
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
 *         description: Coupon deleted
 */
router.delete(
  '/:id',
  [param('id').isUUID()],
  validate,
  couponController.deleteCoupon
);

export default router;
