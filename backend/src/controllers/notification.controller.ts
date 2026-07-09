import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { unread, page = 1 } = req.query;
    const skip = (Number(page) - 1) * 20;

    const where: any = { userId };
    if (unread === 'true') where.isRead = false;

    const notifications = await prisma.notification.findMany({
      where,
      skip,
      take: 20,
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: { notifications } });
  } catch (error) { next(error); }
};

export const getUnreadCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const count = await prisma.notification.count({ where: { userId, isRead: false } });
    res.json({ success: true, data: { count } });
  } catch (error) { next(error); }
};

export const getNotificationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const notification = await prisma.notification.findFirst({ where: { id, userId } });
    if (!notification) throw new AppError('Notification not found', 404);
    res.json({ success: true, data: { notification } });
  } catch (error) { next(error); }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.notification.update({ where: { id }, data: { isRead: true } });
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) { next(error); }
};

export const markAllAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    await prisma.notification.updateMany({ where: { userId }, data: { isRead: true } });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) { next(error); }
};

export const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.notification.delete({ where: { id } });
    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) { next(error); }
};
