import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

// Zod schema for IOrder
const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().min(0),
  quantity: z.number().int().min(0),
});

// Middleware for validating order creation
export const validateOrderCreation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    orderValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(400).json({ success: false, message: errorMessage });
  }
};
