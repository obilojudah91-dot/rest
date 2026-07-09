import { Router } from 'express';
import { query } from 'express-validator';
import * as analyticsController from '../controllers/analytics.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(authenticate, authorize('ADMINISTRATOR', 'MANAGER'));

/**
 * @swagger
 * /api/analytics/dashboard:
 *   get:
 *     summary: Get dashboard analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [today, week, month, year]
 *     responses:
 *       200:
 *         description: Dashboard analytics
 */
router.get(
  '/dashboard',
  [
    query('period').optional().isIn(['today', 'week', 'month', 'year']),
  ],
  validate,
  analyticsController.getDashboardAnalytics
);

/**
 * @swagger
 * /api/analytics/sales:
 *   get:
 *     summary: Get sales analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sales analytics
 */
router.get(
  '/sales',
  [
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601(),
  ],
  validate,
  analyticsController.getSalesAnalytics
);

/**
 * @swagger
 * /api/analytics/orders:
 *   get:
 *     summary: Get order analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order analytics
 */
router.get(
  '/orders',
  [
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601(),
  ],
  validate,
  analyticsController.getOrderAnalytics
);

/**
 * @swagger
 * /api/analytics/products:
 *   get:
 *     summary: Get product analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product analytics
 */
router.get('/products', analyticsController.getProductAnalytics);

/**
 * @swagger
 * /api/analytics/customers:
 *   get:
 *     summary: Get customer analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer analytics
 */
router.get('/customers', analyticsController.getCustomerAnalytics);

export default router;
