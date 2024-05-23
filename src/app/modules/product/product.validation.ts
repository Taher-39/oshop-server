import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

// Zod schema for IVariant
const variantSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Zod schema for IInventory
const inventorySchema = z.object({
  quantity: z.number().int().min(0),
  inStock: z.boolean(),
});

// Zod schema for IProduct
export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(0),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantSchema),
  inventory: inventorySchema,
});

// Middleware for validating product creation
export const validateProductCreation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    productSchema.parse(req.body);
    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(400).json({ success: false, message: errorMessage });
  }
};
