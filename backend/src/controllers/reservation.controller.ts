import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getReservations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { status, page = 1 } = req.query;
    const skip = (Number(page) - 1) * 10;

    const where: any = { userId };
    if (status) where.status = status;

    const reservations = await prisma.reservation.findMany({
      where,
      skip,
      take: 10,
      include: { branch: true },
      orderBy: { date: 'desc' },
    });

    res.json({ success: true, data: { reservations } });
  } catch (error) { next(error); }
};

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const data = req.body;

    const reservation = await prisma.reservation.create({
      data: { ...data, userId },
      include: { branch: true },
    });

    res.status(201).json({ success: true, data: { reservation } });
  } catch (error) { next(error); }
};

export const getReservationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const reservation = await prisma.reservation.findFirst({
      where: { id, userId },
      include: { branch: true },
    });
    if (!reservation) throw new AppError('Reservation not found', 404);
    res.json({ success: true, data: { reservation } });
  } catch (error) { next(error); }
};

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const reservation = await prisma.reservation.update({
      where: { id },
      data: req.body,
      include: { branch: true },
    });
    res.json({ success: true, data: { reservation } });
  } catch (error) { next(error); }
};

export const cancelReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    await prisma.reservation.update({
      where: { id },
      data: { status: 'CANCELLED', cancelledAt: new Date() },
    });
    res.json({ success: true, message: 'Reservation cancelled' });
  } catch (error) { next(error); }
};

export const getAllReservations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: { branch: true, user: { select: { firstName: true, lastName: true, email: true } } },
      orderBy: { date: 'desc' },
    });
    res.json({ success: true, data: { reservations } });
  } catch (error) { next(error); }
};

export const confirmReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.reservation.update({
      where: { id },
      data: { status: 'CONFIRMED', confirmedAt: new Date() },
    });
    res.json({ success: true, message: 'Reservation confirmed' });
  } catch (error) { next(error); }
};
