import { Router } from "express";
import {
  getAllProducts,
  getByID,
  deleteProduct,
  create,
  update,
} from "../controllers/productController";
import { auth } from "../middlewares/auth";

export const ProductRouter = Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:id", getByID);
ProductRouter.post("/", auth, create);
ProductRouter.put("/:id", auth, update);
ProductRouter.delete("/:id", auth, deleteProduct);
