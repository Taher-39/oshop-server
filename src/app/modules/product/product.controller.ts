import { Request, Response } from 'express';
import { productServices } from './product.service';

const postProductController = async (req: Request, res: Response) => {
  try {
    const ProductInfo = req.body;

    if (!ProductInfo) {
      return res.status(400).json({
        success: false,
        message: 'Product information is required.',
      });
    }

    const result = await productServices.postProductService(ProductInfo);
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    // Ensure that the error is an instance of Error before accessing its properties
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      message: 'An error occurred while posting Product information.',
      error: errorMessage,
    });
  }
};
const getAllProductController = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    let result;

    if (searchTerm) {
      result = await productServices.searchProductService(searchTerm);
    } else {
      result = await productServices.getAllProductService();
    }

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No products found${searchTerm ? ` matching search term '${searchTerm}'` : ''}.`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Products ${searchTerm ? `matching search term '${searchTerm}'` : ''} fetched successfully!`,
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching products.',
      error: errorMessage,
    });
  }
};
const getSingelProductController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingelProductService(productId);
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
    const result = await productServices.deleteSingelProductService(productId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product information not found.',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    // Ensure that the error is an instance of Error before accessing its properties
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      message: 'An error occurred while delete singel product.',
      error: errorMessage,
    });
  }
};

export const productController = {
  postProductController,
  getAllProductController,
  getSingelProductController,
  deleteSingelProductController,
};
