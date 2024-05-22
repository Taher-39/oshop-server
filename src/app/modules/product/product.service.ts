import { IProduct } from './product.interface';
import { Product } from './product.model';

const PostProductService = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductService = async () => {
  const result = await Product.find();
  return result;
};
const getSingelProductService = async (productId: string) => {
  const result = await Product.findById({ _id: productId });
  return result;
};
const deleteSingelProductService = async (productId: string) => {
  const result = await Product.findByIdAndDelete({ _id: productId });
  return result;
};

export const ProductServices = {
  PostProductService,
  getAllProductService,
  getSingelProductService,
  deleteSingelProductService,
};
