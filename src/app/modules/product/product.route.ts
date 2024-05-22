import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.post('/products', productController.postProductController);
router.get('/products', productController.getAllProductController);
router.get('/products/:productId', productController.getSingelProductController);

export const productRoutes = router;
