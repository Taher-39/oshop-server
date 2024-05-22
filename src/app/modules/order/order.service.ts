import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

export const createOrderService = async (
  orderData: IOrder,
): Promise<IOrder> => {
  const { productId } = orderData;

  // Validate MongoDB ObjectId
  if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error('Invalid product ID');
  }

  // Check if the product exists in the product collection
  const productExists = await Product.findById(productId);
  if (!productExists) {
    throw new Error('Product not found');
  }

  const newOrder = new Order(orderData);
  await newOrder.save();
  return newOrder;
};
