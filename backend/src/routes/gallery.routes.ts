import { Router } from 'express';
import { body, param } from 'express-validator';
import * as galleryController from '../controllers/gallery.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

/**
 * @swagger
 * /api/gallery:
 *   get:
 *     summary: Get gallery images
 *     tags: [Gallery]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gallery images
 */
router.get('/', galleryController.getGallery);

// Admin routes
router.use(authenticate, authorize('ADMINISTRATOR', 'MANAGER'));

/**
 * @swagger
 * /api/gallery:
 *   post:
 *     summary: Add gallery image (Admin)
 *     tags: [Gallery]
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
 *         description: Image added successfully
 */
router.post(
  '/',
  [
    body('title').trim().notEmpty(),
    body('image').trim().notEmpty(),
  ],
  validate,
  galleryController.addGalleryImage
);

/**
 * @swagger
 * /api/gallery/{id}:
 *   put:
 *     summary: Update gallery image (Admin)
 *     tags: [Gallery]
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
 *         description: Image updated
 */
router.put(
  '/:id',
  [param('id').isUUID()],
  validate,
  galleryController.updateGalleryImage
);

/**
 * @swagger
 * /api/gallery/{id}:
 *   delete:
 *     summary: Delete gallery image (Admin)
 *     tags: [Gallery]
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
 *         description: Image deleted
 */
router.delete(
  '/:id',
  [param('id').isUUID()],
  validate,
  galleryController.deleteGalleryImage
);

export default router;
