import { Router } from 'express';
import { productController } from './product.controller';
import { validateProductCreation } from './product.validation';

const router = Router();

router.post(
  '/',
  validateProductCreation, //zod validation before product creaetion
  productController.postProductController,
);
router.get('/', productController.getAllProductController);
router.get('/:productId', productController.getSingelProductController);
router.put(
  '/:productId',
  validateProductCreation, //zod validation before product update
  productController.updateProductController,
);
router.delete('/:productId', productController.deleteSingelProductController);

export const productRoutes = router;
