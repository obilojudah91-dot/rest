import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });

export const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId, amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { orderId },
    });
    res.json({ success: true, data: { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id } });
  } catch (error) { next(error); }
};

export const confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { paymentIntentId, orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const payment = await prisma.payment.create({
      data: {
        orderId,
        userId,
        amount: paymentIntent.amount / 100,
        status: 'COMPLETED',
        method: 'STRIPE',
        transactionId: paymentIntentId,
        stripePaymentId: paymentIntentId,
      },
    });

    await prisma.order.update({ where: { id: orderId }, data: { status: 'CONFIRMED' } });

    res.json({ success: true, data: { payment } });
  } catch (error) { next(error); }
};

export const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({ where: { id }, include: { order: true } });
    if (!payment) throw new AppError('Payment not found', 404);
    res.json({ success: true, data: { payment } });
  } catch (error) { next(error); }
};

export const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { order: true, user: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: { payments } });
  } catch (error) { next(error); }
};

export const refundPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment) throw new AppError('Payment not found', 404);
    if (!payment.stripePaymentId) throw new AppError('Cannot refund this payment', 400);

    await stripe.refunds.create({ paymentIntent: payment.stripePaymentId });

    await prisma.payment.update({ where: { id }, data: { status: 'REFUNDED' } });
    await prisma.order.update({ where: { id: payment.orderId }, data: { status: 'REFUNDED' } });

    res.json({ success: true, message: 'Payment refunded' });
  } catch (error) { next(error); }
};
