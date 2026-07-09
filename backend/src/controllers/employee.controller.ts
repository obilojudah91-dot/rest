import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await prisma.employee.findMany({
      include: { user: { select: { firstName: true, lastName: true, email: true, role: true } }, branch: true },
    });
    res.json({ success: true, data: { employees } });
  } catch (error) { next(error); }
};

export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await prisma.employee.create({
      data: req.body,
      include: { user: { select: { firstName: true, lastName: true, email: true } }, branch: true },
    });
    res.status(201).json({ success: true, data: { employee } });
  } catch (error) { next(error); }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { user: true, branch: true },
    });
    if (!employee) throw new AppError('Employee not found', 404);
    res.json({ success: true, data: { employee } });
  } catch (error) { next(error); }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.update({
      where: { id },
      data: req.body,
      include: { user: { select: { firstName: true, lastName: true } }, branch: true },
    });
    res.json({ success: true, data: { employee } });
  } catch (error) { next(error); }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({ where: { id } });
    res.json({ success: true, message: 'Employee deleted' });
  } catch (error) { next(error); }
};
