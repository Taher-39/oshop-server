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
        { description: { $regex: new RegExp(searchTerm, 'i') } },
        { category: { $regex: new RegExp(searchTerm, 'i') } },
        { tags: { $regex: new RegExp(searchTerm, 'i') } },
        { 'variants.value': { $regex: new RegExp(searchTerm, 'i') } },
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
const updateProductService = async (
  productId: string,
  updates: Partial<IProduct>,
): Promise<IProduct> => {
  const validUpdates = Object.keys(updates);
  const allowedUpdates: Array<keyof IProduct> = [
    'name',
    'description',
    'price',
    'category',
    'tags',
    'variants',
    'inventory',
  ];
  const isValidOperation = validUpdates.every((update) =>
    allowedUpdates.includes(update as keyof IProduct),
  );

  if (!isValidOperation) {
    throw new Error('Invalid updates!');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found!');
  }

  validUpdates.forEach((update) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (product as any)[update as keyof IProduct] =
      updates[update as keyof IProduct];
  });

  await product.save();

  return product;
};

const deleteSingelProductService = async (productId: string) => {
  const result = await Product.findByIdAndDelete({ _id: productId });
  return result;
};

export const productServices = {
  postProductService,
  getAllProductService,
  getSingelProductService,
  updateProductService,
  deleteSingelProductService,
  searchProductService,
};
