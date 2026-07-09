import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getIngredients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredients = await prisma.ingredient.findMany({ orderBy: { name: 'asc' } });
    res.json({ success: true, data: { ingredients } });
  } catch (error) { next(error); }
};

export const createIngredient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredient = await prisma.ingredient.create({ data: req.body });
    res.status(201).json({ success: true, data: { ingredient } });
  } catch (error) { next(error); }
};

export const getIngredientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ingredient = await prisma.ingredient.findUnique({ where: { id } });
    if (!ingredient) throw new AppError('Ingredient not found', 404);
    res.json({ success: true, data: { ingredient } });
  } catch (error) { next(error); }
};

export const updateIngredient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ingredient = await prisma.ingredient.update({ where: { id }, data: req.body });
    res.json({ success: true, data: { ingredient } });
  } catch (error) { next(error); }
};

export const deleteIngredient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.ingredient.delete({ where: { id } });
    res.json({ success: true, message: 'Ingredient deleted' });
  } catch (error) { next(error); }
};

export const adjustStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { quantity, type } = req.body;

    const ingredient = await prisma.ingredient.findUnique({ where: { id } });
    if (!ingredient) throw new AppError('Ingredient not found', 404);

    const newStock = type === 'ADD' 
      ? Number(ingredient.stock) + Number(quantity)
      : Number(ingredient.stock) - Number(quantity);

    await prisma.ingredient.update({ where: { id }, data: { stock: newStock } });

    await prisma.inventoryLog.create({
      data: { ingredientId: id, type, quantity: Number(quantity) },
    });

    res.json({ success: true, message: 'Stock adjusted' });
  } catch (error) { next(error); }
};

export const getLowStockAlerts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredients = await prisma.ingredient.findMany({
      where: { stock: { lte: prisma.ingredient.fields.minStock } },
    });
    res.json({ success: true, data: { ingredients } });
  } catch (error) { next(error); }
};
