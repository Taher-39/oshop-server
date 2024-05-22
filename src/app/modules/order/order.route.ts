import { Router } from 'express';
import { createOrderController } from './order.controller';

const router = Router();

router.post('/', createOrderController);

export const orderRoutes = router;
