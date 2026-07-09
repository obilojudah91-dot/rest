import { Router } from 'express';
import { body, param } from 'express-validator';
import * as branchController from '../controllers/branch.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

/**
 * @swagger
 * /api/branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: List of branches
 */
router.get('/', branchController.getBranches);

/**
 * @swagger
 * /api/branches/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch details
 */
router.get(
  '/:id',
  [param('id').isUUID()],
  validate,
  branchController.getBranchById
);

// Admin routes
router.use(authenticate, authorize('ADMINISTRATOR', 'MANAGER'));

/**
 * @swagger
 * /api/branches:
 *   post:
 *     summary: Create branch (Admin)
 *     tags: [Branches]
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
 *         description: Branch created successfully
 */
router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('address').trim().notEmpty(),
    body('city').trim().notEmpty(),
    body('phone').trim().notEmpty(),
  ],
  validate,
  branchController.createBranch
);

/**
 * @swagger
 * /api/branches/{id}:
 *   put:
 *     summary: Update branch (Admin)
 *     tags: [Branches]
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
 *         description: Branch updated
 */
router.put(
  '/:id',
  [param('id').isUUID()],
  validate,
  branchController.updateBranch
);

/**
 * @swagger
 * /api/branches/{id}:
 *   delete:
 *     summary: Delete branch (Admin)
 *     tags: [Branches]
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
 *         description: Branch deleted
 */
router.delete(
  '/:id',
  [param('id').isUUID()],
  validate,
  branchController.deleteBranch
);

export default router;
