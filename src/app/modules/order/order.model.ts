import { Schema, model, Document } from 'mongoose';
import { IOrder } from './order.interface';

interface IOrderModel extends IOrder, Document {}

const orderSchema = new Schema<IOrderModel>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Order = model<IOrderModel>('Order', orderSchema);
