import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const postProductController = async (req: Request, res: Response) => {
  try {
    const ProductInfo = req.body;

    if (!ProductInfo) {
      return res.status(400).json({
        success: false,
        message: 'Product information is required.',
      });
    }

    const result = await ProductServices.PostProductService(ProductInfo);
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    console.error('Error posting Product information:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while posting Product information.',
      error: error,
    });
  }
};
const getAllProductController = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductService();
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product information not found.',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while getting all product information.',
      error: error,
    });
  }
};
const getSingelProductController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingelProductService(productId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product information not found.',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while getting singel product information.',
      error: error,
    });
  }
};
const deleteSingelProductController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingelProductService(productId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product information not found.',
      });
      return;
    }
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while delete singel product.',
      error: error,
    });
  }
};

export const productController = {
  postProductController,
  getAllProductController,
  getSingelProductController,
  deleteSingelProductController,
};
