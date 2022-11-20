import { ProductModel, ProductType } from "../models/product";
import { Response, Request } from "express";

const product: ProductModel = new ProductModel();

export const getAllProducts = async (req: Request, res: Response) => {
  const allProducts: ProductType[] = await product.getProducts();
  return res.json(allProducts);
};

export const getByID = async (req: Request, res: Response) => {
  const productId: number = parseInt(req.params.id);
  const productById: ProductType = await product.getProductById(productId);
  return res.json(productById);
};

export const create = async (req: Request, res: Response) => {
  const createdProduct: ProductType = await product.createProduct(req.body);
  return res.json(createdProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const deletedOrder = await product.deleteProduct(id);
  return res.json(deletedOrder);
};
