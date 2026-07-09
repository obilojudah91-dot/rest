import { Router } from 'express';
import { body, param } from 'express-validator';
import * as settingsController from '../controllers/settings.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.use(authenticate, authorize('ADMINISTRATOR'));

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get all settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Settings
 */
router.get('/', settingsController.getSettings);

/**
 * @swagger
 * /api/settings/{key}:
 *   get:
 *     summary: Get setting by key
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Setting value
 */
router.get('/:key', settingsController.getSettingByKey);

/**
 * @swagger
 * /api/settings:
 *   post:
 *     summary: Create setting
 *     tags: [Settings]
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
 *         description: Setting created
 */
router.post(
  '/',
  [
    body('key').trim().notEmpty(),
    body('value').notEmpty(),
  ],
  validate,
  settingsController.createSetting
);

/**
 * @swagger
 * /api/settings/{key}:
 *   put:
 *     summary: Update setting
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
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
 *         description: Setting updated
 */
router.put(
  '/:key',
  [
    param('key').trim().notEmpty(),
    body('value').notEmpty(),
  ],
  validate,
  settingsController.updateSetting
);

/**
 * @swagger
 * /api/settings/{key}:
 *   delete:
 *     summary: Delete setting
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Setting deleted
 */
router.delete(
  '/:key',
  [param('key').trim().notEmpty()],
  validate,
  settingsController.deleteSetting
);

export default router;
