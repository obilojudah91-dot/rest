import { Router } from 'express';
import { body, param, query } from 'express-validator';
import * as orderController from '../controllers/order.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get user orders
 *     tags: [Orders]
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
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get(
  '/',
  [
    query('status').optional(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  validate,
  orderController.getOrders
);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create new order
 *     tags: [Orders]
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
 *         description: Order created successfully
 */
router.post(
  '/',
  [
    body('items').isArray({ min: 1 }),
    body('items.*.productId').isUUID(),
    body('items.*.quantity').isInt({ min: 1 }),
    body('type').isIn(['DELIVERY', 'PICKUP', 'DINE_IN']),
    body('addressId').optional().isUUID(),
  ],
  validate,
  orderController.createOrder
);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
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
 *         description: Order details
 */
router.get(
  '/:id',
  [param('id').isUUID()],
  validate,
  orderController.getOrderById
);

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   post:
 *     summary: Cancel order
 *     tags: [Orders]
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
 *         description: Order cancelled successfully
 */
router.post(
  '/:id/cancel',
  [param('id').isUUID()],
  validate,
  orderController.cancelOrder
);

// Chef routes
router.use(
  '/chef',
  authenticate,
  authorize('CHEF', 'ADMINISTRATOR', 'MANAGER')
);

/**
 * @swagger
 * /api/orders/chef/queue:
 *   get:
 *     summary: Get cooking queue (Chef)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cooking queue
 */
router.get('/chef/queue', orderController.getCookingQueue);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (Chef)
 *     tags: [Orders]
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
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated
 */
router.put(
  '/:id/status',
  [param('id').isUUID(), body('status').isIn(['PREPARING', 'READY'])],
  validate,
  orderController.updateOrderStatus
);

// Admin routes
router.use(authenticate, authorize('ADMINISTRATOR', 'MANAGER'));

/**
 * @swagger
 * /api/orders/all:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All orders
 */
router.get('/all', orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update order (Admin)
 *     tags: [Orders]
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
 *         description: Order updated
 */
router.put(
  '/:id',
  [param('id').isUUID()],
  validate,
  orderController.updateOrder
);

export default router;
