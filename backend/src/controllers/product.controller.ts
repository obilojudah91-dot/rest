import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { isAvailable: true };
    if (category) where.categoryId = category;
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' as any } },
        { description: { contains: search as string, mode: 'insensitive' as any } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(limit),
        include: { category: true },
        orderBy: { order: 'asc' },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({ success: true, data: { products, pagination: { total, page: Number(page), limit: Number(limit) } } });
  } catch (error) { next(error); }
};

export const getFeaturedProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      where: { isFeatured: true, isAvailable: true },
      include: { category: true },
      take: 10,
    });
    res.json({ success: true, data: { products } });
  } catch (error) { next(error); }
};

export const getPopularProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      where: { isPopular: true, isAvailable: true },
      include: { category: true },
      take: 10,
    });
    res.json({ success: true, data: { products } });
  } catch (error) { next(error); }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, ingredients: { include: { ingredient: true } } },
    });
    if (!product) throw new AppError('Product not found', 404);
    res.json({ success: true, data: { product } });
  } catch (error) { next(error); }
};

export const getProductReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const reviews = await prisma.review.findMany({
      where: { productId: id, isApproved: true },
      include: { user: { select: { firstName: true, lastName: true, avatar: true } } },
    });
    res.json({ success: true, data: { reviews } });
  } catch (error) { next(error); }
};

export const getUserFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: { product: { include: { category: true } } },
    });
    res.json({ success: true, data: { favorites } });
  } catch (error) { next(error); }
};

export const addToFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    await prisma.favorite.create({ data: { userId, productId: id } });
    res.status(201).json({ success: true, message: 'Added to favorites' });
  } catch (error) { next(error); }
};

export const removeFromFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    await prisma.favorite.deleteMany({ where: { userId, productId: id } });
    res.json({ success: true, message: 'Removed from favorites' });
  } catch (error) { next(error); }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const product = await prisma.product.create({
      data,
      include: { category: true },
    });
    res.status(201).json({ success: true, data: { product } });
  } catch (error) { next(error); }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: req.body,
      include: { category: true },
    });
    res.json({ success: true, data: { product } });
  } catch (error) { next(error); }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) { next(error); }
};
