import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getBranches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branches = await prisma.branch.findMany({ where: { isOpen: true } });
    res.json({ success: true, data: { branches } });
  } catch (error) { next(error); }
};

export const getBranchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const branch = await prisma.branch.findUnique({ where: { id } });
    if (!branch) throw new AppError('Branch not found', 404);
    res.json({ success: true, data: { branch } });
  } catch (error) { next(error); }
};

export const createBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branch = await prisma.branch.create({ data: req.body });
    res.status(201).json({ success: true, data: { branch } });
  } catch (error) { next(error); }
};

export const updateBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const branch = await prisma.branch.update({ where: { id }, data: req.body });
    res.json({ success: true, data: { branch } });
  } catch (error) { next(error); }
};

export const deleteBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.branch.delete({ where: { id } });
    res.json({ success: true, message: 'Branch deleted' });
  } catch (error) { next(error); }
};
