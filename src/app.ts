import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routing
app.use('/api/products', productRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('connected');
});

export default app;
