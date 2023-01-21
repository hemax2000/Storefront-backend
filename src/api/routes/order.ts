import { Router } from "express";
import {
  addProduct,
  create,
  deleteOrder,
  getAllCompletedOrders,
  getAllOrders,
  getOrderById,
  updateStatus,
} from "../controllers/orderController";
import { auth } from "../middlewares/auth";

export const OrderRouter: Router = Router();

OrderRouter.get("/", auth, getAllOrders);
OrderRouter.get("/completed", auth, getAllCompletedOrders);
OrderRouter.get("/:id", auth, getOrderById);
OrderRouter.put("/:id", auth, updateStatus);
OrderRouter.delete("/:id", auth, deleteOrder);
OrderRouter.post("/", auth, create);
OrderRouter.post("/:id", auth, addProduct);
