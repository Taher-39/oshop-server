import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const objectIdPattern = /^[a-fA-F0-9]{24}$/;

export const orderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address. Please provide a valid email.' }),
  productId: z.string().regex(objectIdPattern, {
    message: 'Product ID must be a 24-character hexadecimal string.',
  }),
  price: z.number().min(0, { message: 'Price must be a non-negative number.' }),
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer.' })
    .min(0, { message: 'Quantity must be a non-negative integer.' }),
});

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
