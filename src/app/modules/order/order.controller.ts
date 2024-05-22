import { Request, Response } from 'express';
import { createOrderService } from './order.service';

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const newOrder = await createOrderService(orderData);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
