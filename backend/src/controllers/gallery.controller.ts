import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;
    const where: any = { isActive: true };
    if (category) where.category = category;

    const gallery = await prisma.gallery.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    res.json({ success: true, data: { gallery } });
  } catch (error) { next(error); }
};

export const addGalleryImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const image = await prisma.gallery.create({ data: req.body });
    res.status(201).json({ success: true, data: { image } });
  } catch (error) { next(error); }
};

export const updateGalleryImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const image = await prisma.gallery.update({ where: { id }, data: req.body });
    res.json({ success: true, data: { image } });
  } catch (error) { next(error); }
};

export const deleteGalleryImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.gallery.delete({ where: { id } });
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) { next(error); }
};
