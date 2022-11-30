import { Router } from "express";
import {
  create,
  deleteOrder,
  getAllCompletedOrders,
  getAllOrders,
  updateStatus,
} from "../controllers/orderController";
import { auth } from "../middlewares/auth";

export const OrderRouter: Router = Router();

OrderRouter.get("/:user_id", auth, getAllOrders);
OrderRouter.get("/completed/:user_id", auth, getAllCompletedOrders);
OrderRouter.put("/:id", auth, updateStatus);
OrderRouter.delete("/:id", auth, deleteOrder);
OrderRouter.post("/", auth, create);
