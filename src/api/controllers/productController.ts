import { ProductModel, ProductType } from "../models/product";
import { Response, Request } from "express";

const product: ProductModel = new ProductModel();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts: ProductType[] = await product.getProducts();
    return res.json(allProducts);
  } catch (error) {
    return res.status(500).json("Failed to get all users. error:" + error);
  }
};

export const getByID = async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id);
    const productById: ProductType = await product.getProductById(productId);
    return res.json(productById);
  } catch (error) {
    return res.status(500).json("Failed to get user by id. error:" + error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const createdProduct: ProductType = await product.createProduct(req.body);
    return res.json(createdProduct);
  } catch (error) {
    return res.status(500).json("Failed to create user. error:" + error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const updatedProduct: ProductType = await product.updateProduct(
      id,
      req.body
    );
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json("Failed to update user. error:" + error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedProduct = await product.deleteProduct(id);
    return res.json(deletedProduct);
  } catch (error) {
    return res.status(500).json("Failed to delete user. error:" + error);
  }
};
