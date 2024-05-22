import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.post('/', productController.postProductController);
router.get('/', productController.getAllProductController);
router.get('/:productId', productController.getSingelProductController);
router.delete('/:productId', productController.deleteSingelProductController);

export const productRoutes = router;
