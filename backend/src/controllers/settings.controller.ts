import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await prisma.settings.findMany();
    const settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
    res.json({ success: true, data: { settings: settingsMap } });
  } catch (error) { next(error); }
};

export const getSettingByKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;
    const setting = await prisma.settings.findUnique({ where: { key } });
    if (!setting) throw new AppError('Setting not found', 404);
    res.json({ success: true, data: { value: setting.value } });
  } catch (error) { next(error); }
};

export const createSetting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const setting = await prisma.settings.create({ data: req.body });
    res.status(201).json({ success: true, data: { setting } });
  } catch (error) { next(error); }
};

export const updateSetting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;
    const setting = await prisma.settings.upsert({
      where: { key },
      update: { value: req.body.value },
      create: { key, value: req.body.value, description: req.body.description },
    });
    res.json({ success: true, data: { setting } });
  } catch (error) { next(error); }
};

export const deleteSetting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;
    await prisma.settings.delete({ where: { key } });
    res.json({ success: true, message: 'Setting deleted' });
  } catch (error) { next(error); }
};
