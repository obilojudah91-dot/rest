import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { userId };
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: Number(limit),
        include: { items: { include: { product: true } }, address: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({ success: true, data: { orders, pagination: { total, page: Number(page), limit: Number(limit) } } });
  } catch (error) { next(error); }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { items, type, addressId, notes, scheduledFor, couponId } = req.body;

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    let subtotal = 0;
    const orderItems = items.map((item: any) => {
      subtotal += item.price * item.quantity;
      return { productId: item.productId, quantity: item.quantity, price: item.price };
    });

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        type,
        addressId,
        notes,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        subtotal,
        total: subtotal,
        items: { create: orderItems },
        couponId,
      },
      include: { items: { include: { product: true } } },
    });

    res.status(201).json({ success: true, data: { order } });
  } catch (error) { next(error); }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const order = await prisma.order.findFirst({
      where: { id, userId },
      include: { items: { include: { product: true } }, address: true, payments: true },
    });
    if (!order) throw new AppError('Order not found', 404);
    res.json({ success: true, data: { order } });
  } catch (error) { next(error); }
};

export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const order = await prisma.order.findFirst({ where: { id, userId } });
    if (!order) throw new AppError('Order not found', 404);
    if (order.status !== 'PENDING') throw new AppError('Cannot cancel this order', 400);

    await prisma.order.update({ where: { id }, data: { status: 'CANCELLED' } });
    res.json({ success: true, message: 'Order cancelled' });
  } catch (error) { next(error); }
};

export const getCookingQueue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.order.findMany({
      where: { status: { in: ['CONFIRMED', 'PREPARING'] } },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'asc' },
    });
    res.json({ success: true, data: { orders } });
  } catch (error) { next(error); }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    res.json({ success: true, data: { order } });
  } catch (error) { next(error); }
};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: Number(limit),
        include: { items: { include: { product: true } }, user: { select: { firstName: true, lastName: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count(),
    ]);

    res.json({ success: true, data: { orders, pagination: { total, page: Number(page), limit: Number(limit) } } });
  } catch (error) { next(error); }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.update({ where: { id }, data: req.body });
    res.json({ success: true, data: { order } });
  } catch (error) { next(error); }
};
