import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/order/order.route';
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routing
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('connected');
});

// Not Found route
app.use((req: Request, res: Response) => {
  const error = new Error('Route not found');
  res.status(404).json({ success: false, message: error.message });
});

// Error handler
app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ success: false, message: err.message });
});

export default app;
