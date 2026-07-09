import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    res.json({ success: true, data: { categories } });
  } catch (error) { next(error); }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new AppError('Category not found', 404);
    res.json({ success: true, data: { category } });
  } catch (error) { next(error); }
};

export const getCategoryProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const products = await prisma.product.findMany({
      where: { categoryId: id, isAvailable: true },
      include: { category: true },
    });
    res.json({ success: true, data: { products } });
  } catch (error) { next(error); }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await prisma.category.create({ data: req.body });
    res.status(201).json({ success: true, data: { category } });
  } catch (error) { next(error); }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.update({ where: { id }, data: req.body });
    res.json({ success: true, data: { category } });
  } catch (error) { next(error); }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id } });
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) { next(error); }
};
