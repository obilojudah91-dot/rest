import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { productId, rating, comment, photos } = req.body;

    const review = await prisma.review.create({
      data: { userId, productId, rating, comment, photos },
      include: { user: { select: { firstName: true, lastName: true, avatar: true } } },
    });

    res.status(201).json({ success: true, data: { review } });
  } catch (error) { next(error); }
};

export const getReviewById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({
      where: { id },
      include: { user: { select: { firstName: true, lastName: true, avatar: true } } },
    });
    if (!review) throw new AppError('Review not found', 404);
    res.json({ success: true, data: { review } });
  } catch (error) { next(error); }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const review = await prisma.review.update({
      where: { id },
      data: req.body,
    });
    res.json({ success: true, data: { review } });
  } catch (error) { next(error); }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.review.delete({ where: { id } });
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) { next(error); }
};

export const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await prisma.review.findMany({
      include: { user: { select: { firstName: true, lastName: true, avatar: true } }, product: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: { reviews } });
  } catch (error) { next(error); }
};

export const approveReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.review.update({ where: { id }, data: { isApproved: true } });
    res.json({ success: true, message: 'Review approved' });
  } catch (error) { next(error); }
};
