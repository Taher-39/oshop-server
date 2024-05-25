import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const variantSchema = z.object({
  type: z
    .string()
    .min(1, { message: 'Variant type must be a non-empty string.' }),
  value: z
    .string()
    .min(1, { message: 'Variant value must be a non-empty string.' }),
});

// Zod schema for IInventory
const inventorySchema = z.object({
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer.' })
    .min(0, { message: 'Quantity cannot be negative.' }),
  inStock: z.boolean({ message: 'InStock must be a boolean value.' }),
});

// Zod schema for IProduct
export const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required and cannot be empty.' }),
  description: z
    .string()
    .min(1, { message: 'Description is required and cannot be empty.' }),
  price: z.number().min(0, { message: 'Price must be a non-negative number.' }),
  category: z
    .string()
    .min(1, { message: 'Category is required and cannot be empty.' }),
  tags: z
    .array(z.string().min(1, { message: 'Tags must be non-empty strings.' }))
    .min(1, { message: 'There must be at least one tag.' }),
  variants: z
    .array(variantSchema)
    .min(1, { message: 'There must be at least one variant.' }),
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
