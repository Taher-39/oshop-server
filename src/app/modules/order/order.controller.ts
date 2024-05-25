import { Request, Response } from 'express';
import { createOrderService, getOrdersService } from './order.service';

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

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let orders;
    if (email) {
      if (typeof email !== 'string') {
        throw new Error('Email query parameter must be a string');
      }
      orders = await getOrdersService(email);
    } else {
      orders = await getOrdersService();
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
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
