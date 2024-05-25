import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

export const createOrderService = async (
  orderData: IOrder,
): Promise<IOrder> => {
  const { productId, price, quantity } = orderData;

  // Check if the product exists in the product collection
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if the product price matches
  if (product.price !== price) {
    throw new Error('Product price mismatch');
  }

  // Check if the product has sufficient quantity
  if (product.inventory.quantity < quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // Create and save the order
  const newOrder = new Order(orderData);
  const result = await newOrder.save();

  // Update the product inventory only if the order is successfully created
  if (result._id) {
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();
  }

  return newOrder;
};

export const getOrdersService = async (email?: string): Promise<IOrder[]> => {
  if (email) {
    return await Order.find({ email });
  }
  return await Order.find();
};
