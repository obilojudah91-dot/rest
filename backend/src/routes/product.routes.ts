import { Router } from 'express';
import { body, param, query } from 'express-validator';
import * as productController from '../controllers/product.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
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
 *         description: List of products
 */
router.get(
  '/',
  [
    query('category').optional(),
    query('search').optional(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  validate,
  productController.getProducts
);

/**
 * @swagger
 * /api/products/featured:
 *   get:
 *     summary: Get featured products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Featured products
 */
router.get('/featured', productController.getFeaturedProducts);

/**
 * @swagger
 * /api/products/popular:
 *   get:
 *     summary: Get popular products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Popular products
 */
router.get('/popular', productController.getPopularProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 */
router.get(
  '/:id',
  [param('id').isUUID()],
  validate,
  productController.getProductById
);

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   get:
 *     summary: Get product reviews
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product reviews
 */
router.get(
  '/:id/reviews',
  [param('id').isUUID()],
  validate,
  productController.getProductReviews
);

// Protected routes
router.use(authenticate);

/**
 * @swagger
 * /api/products/favorites:
 *   get:
 *     summary: Get user favorites
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User favorites
 */
router.get('/favorites/list', productController.getUserFavorites);

/**
 * @swagger
 * /api/products/{id}/favorite:
 *   post:
 *     summary: Add to favorites
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Added to favorites
 */
router.post(
  '/:id/favorite',
  [param('id').isUUID()],
  validate,
  productController.addToFavorites
);

/**
 * @swagger
 * /api/products/{id}/favorite:
 *   delete:
 *     summary: Remove from favorites
 *     tags: [Products]
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
 *         description: Removed from favorites
 */
router.delete(
  '/:id/favorite',
  [param('id').isUUID()],
  validate,
  productController.removeFromFavorites
);

// Admin routes
router.use(authorize('ADMINISTRATOR', 'MANAGER'));

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product (Admin)
 *     tags: [Products]
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
 *         description: Product created successfully
 */
router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('categoryId').isUUID(),
    body('image').notEmpty(),
  ],
  validate,
  productController.createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product (Admin)
 *     tags: [Products]
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
 *         description: Product updated successfully
 */
router.put(
  '/:id',
  [param('id').isUUID()],
  validate,
  productController.updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product (Admin)
 *     tags: [Products]
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
 *         description: Product deleted successfully
 */
router.delete(
  '/:id',
  [param('id').isUUID()],
  validate,
  productController.deleteProduct
);

export default router;
