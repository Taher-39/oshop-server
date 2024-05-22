import { IProduct } from './product.interface';
import { Product } from './product.model';

const postProductService = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};
const searchProductService = async (searchTerm?: string) => {
  let query = {};
  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search by product name
        { description: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search by description
      ],
    };
  }
  const result = await Product.find(query);
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

export const productServices = {
  postProductService,
  getAllProductService,
  getSingelProductService,
  deleteSingelProductService,
  searchProductService,
};
