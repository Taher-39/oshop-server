import { Router } from 'express';
import { createOrderController, getOrdersController } from './order.controller';

const router = Router();

router.post('/', createOrderController);
router.get('/', getOrdersController);

export const orderRoutes = router;
