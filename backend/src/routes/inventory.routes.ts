import { Router } from 'express';
import { body, param } from 'express-validator';
import * as inventoryController from '../controllers/inventory.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(authenticate, authorize('ADMINISTRATOR', 'MANAGER', 'CHEF'));

/**
 * @swagger
 * /api/inventory/ingredients:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of ingredients
 */
router.get('/ingredients', inventoryController.getIngredients);

/**
 * @swagger
 * /api/inventory/ingredients:
 *   post:
 *     summary: Create ingredient
 *     tags: [Inventory]
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
 *         description: Ingredient created successfully
 */
router.post(
  '/ingredients',
  [
    body('name').trim().notEmpty(),
    body('unit').trim().notEmpty(),
    body('stock').isFloat({ min: 0 }),
    body('cost').isFloat({ min: 0 }),
  ],
  validate,
  inventoryController.createIngredient
);

/**
 * @swagger
 * /api/inventory/ingredients/{id}:
 *   get:
 *     summary: Get ingredient by ID
 *     tags: [Inventory]
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
 *         description: Ingredient details
 */
router.get(
  '/ingredients/:id',
  [param('id').isUUID()],
  validate,
  inventoryController.getIngredientById
);

/**
 * @swagger
 * /api/inventory/ingredients/{id}:
 *   put:
 *     summary: Update ingredient
 *     tags: [Inventory]
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
 *         description: Ingredient updated
 */
router.put(
  '/ingredients/:id',
  [param('id').isUUID()],
  validate,
  inventoryController.updateIngredient
);

/**
 * @swagger
 * /api/inventory/ingredients/{id}:
 *   delete:
 *     summary: Delete ingredient
 *     tags: [Inventory]
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
 *         description: Ingredient deleted
 */
router.delete(
  '/ingredients/:id',
  [param('id').isUUID()],
  validate,
  inventoryController.deleteIngredient
);

/**
 * @swagger
 * /api/inventory/ingredients/{id}/adjust:
 *   post:
 *     summary: Adjust ingredient stock
 *     tags: [Inventory]
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
 *               quantity:
 *                 type: number
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stock adjusted
 */
router.post(
  '/ingredients/:id/adjust',
  [
    param('id').isUUID(),
    body('quantity').isFloat(),
    body('type').isIn(['ADD', 'REMOVE']),
  ],
  validate,
  inventoryController.adjustStock
);

/**
 * @swagger
 * /api/inventory/alerts:
 *   get:
 *     summary: Get low stock alerts
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Low stock alerts
 */
router.get('/alerts', inventoryController.getLowStockAlerts);

export default router;
