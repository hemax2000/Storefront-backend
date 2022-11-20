import { Router } from "express";
import {
  getAllProducts,
  getByID,
  deleteProduct,
  create,
} from "../controllers/productController";
import { auth } from "../middlewares/auth";

export const ProductRouter = Router();

ProductRouter.get("/", auth, getAllProducts);
ProductRouter.get("/:id", auth, getByID);
ProductRouter.post("/", auth, create);
ProductRouter.delete("/:id", auth, deleteProduct);
