import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const validateCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, orderTotal } = req.body;

    const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
    if (!coupon) throw new AppError('Invalid coupon code', 404);
    if (!coupon.isActive) throw new AppError('Coupon is inactive', 400);
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) throw new AppError('Coupon usage limit reached', 400);
    if (coupon.validUntil && new Date() > coupon.validUntil) throw new AppError('Coupon has expired', 400);
    if (orderTotal < Number(coupon.minOrder)) throw new AppError(`Minimum order amount is $${coupon.minOrder}`, 400);

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discount = Number(orderTotal) * (Number(coupon.discountValue) / 100);
    } else {
      discount = Number(coupon.discountValue);
    }

    if (coupon.maxDiscount && discount > Number(coupon.maxDiscount)) {
      discount = Number(coupon.maxDiscount);
    }

    res.json({ success: true, data: { valid: true, discount, coupon } });
  } catch (error) { next(error); }
};

export const getCoupons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: { coupons } });
  } catch (error) { next(error); }
};

export const createCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coupon = await prisma.coupon.create({ data: req.body });
    res.status(201).json({ success: true, data: { coupon } });
  } catch (error) { next(error); }
};

export const getCouponById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const coupon = await prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new AppError('Coupon not found', 404);
    res.json({ success: true, data: { coupon } });
  } catch (error) { next(error); }
};

export const updateCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const coupon = await prisma.coupon.update({ where: { id }, data: req.body });
    res.json({ success: true, data: { coupon } });
  } catch (error) { next(error); }
};

export const deleteCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.coupon.delete({ where: { id } });
    res.json({ success: true, message: 'Coupon deleted' });
  } catch (error) { next(error); }
};
