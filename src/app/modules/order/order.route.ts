import { Router } from 'express';
import { createOrderController, getOrdersController } from './order.controller';
import { validateOrderCreation } from './order.validation';

const router = Router();
//zod validation before order creaetion
router.post('/', validateOrderCreation, createOrderController);
router.get('/', getOrdersController);

export const orderRoutes = router;
