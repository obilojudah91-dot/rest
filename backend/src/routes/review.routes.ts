import { Router } from 'express';
import { body, param } from 'express-validator';
import * as reviewController from '../controllers/review.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create review
 *     tags: [Reviews]
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
 *         description: Review created successfully
 */
router.post(
  '/',
  [
    body('productId').isUUID(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').optional().trim(),
  ],
  validate,
  reviewController.createReview
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review details
 */
router.get(
  '/:id',
  [param('id').isUUID()],
  validate,
  reviewController.getReviewById
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update review
 *     tags: [Reviews]
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
 *         description: Review updated
 */
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('rating').optional().isInt({ min: 1, max: 5 }),
    body('comment').optional().trim(),
  ],
  validate,
  reviewController.updateReview
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete review
 *     tags: [Reviews]
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
 *         description: Review deleted
 */
router.delete(
  '/:id',
  [param('id').isUUID()],
  validate,
  reviewController.deleteReview
);

// Admin routes
router.use(authenticate, authorize('ADMINISTRATOR', 'MANAGER'));

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews (Admin)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All reviews
 */
router.get('/', reviewController.getAllReviews);

/**
 * @swagger
 * /api/reviews/{id}/approve:
 *   post:
 *     summary: Approve review (Admin)
 *     tags: [Reviews]
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
 *         description: Review approved
 */
router.post(
  '/:id/approve',
  [param('id').isUUID()],
  validate,
  reviewController.approveReview
);

export default router;
