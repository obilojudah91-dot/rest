import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { period = 'today' } = req.query;
    
    let startDate = new Date();
    if (period === 'week') startDate.setDate(startDate.getDate() - 7);
    else if (period === 'month') startDate.setMonth(startDate.getMonth() - 1);
    else if (period === 'year') startDate.setFullYear(startDate.getFullYear() - 1);
    else startDate.setHours(0, 0, 0, 0);

    const [totalSales, totalOrders, totalCustomers, popularProducts] = await Promise.all([
      prisma.payment.aggregate({
        where: { createdAt: { gte: startDate }, status: 'COMPLETED' },
        _sum: { amount: true },
      }),
      prisma.order.count({ where: { createdAt: { gte: startDate } } }),
      prisma.user.count({ where: { createdAt: { gte: startDate }, role: 'CUSTOMER' } }),
      prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 5,
      }),
    ]);

    res.json({
      success: true,
      data: {
        totalSales: totalSales._sum.amount || 0,
        totalOrders,
        totalCustomers,
        popularProducts,
      },
    });
  } catch (error) { next(error); }
};

export const getSalesAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate } = req.query;
    const payments = await prisma.payment.findMany({
      where: {
        createdAt: {
          gte: startDate ? new Date(startDate as string) : undefined,
          lte: endDate ? new Date(endDate as string) : undefined,
        },
        status: 'COMPLETED',
      },
      orderBy: { createdAt: 'asc' },
    });
    res.json({ success: true, data: { payments } });
  } catch (error) { next(error); }
};

export const getOrderAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.order.groupBy({
      by: ['status'],
      _count: true,
    });
    res.json({ success: true, data: { orders } });
  } catch (error) { next(error); }
};

export const getProductAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      include: { _count: { select: { orderItems: true } } },
      orderBy: { orderItems: { _count: 'desc' } },
      take: 10,
    });
    res.json({ success: true, data: { products } });
  } catch (error) { next(error); }
};

export const getCustomerAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      include: { _count: { select: { orders: true } } },
      orderBy: { orders: { _count: 'desc' } },
      take: 10,
    });
    res.json({ success: true, data: { customers } });
  } catch (error) { next(error); }
};
