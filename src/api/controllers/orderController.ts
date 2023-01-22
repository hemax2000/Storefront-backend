import { Response, Request } from "express";
import { OrderModel } from "../models/order";
import { OrderType, OrderToProductType } from "../models/order";

const order: OrderModel = new OrderModel();

// Get all orders by user id
export const getAllOrders = async (_: Request, res: Response) => {
  try {
    const allOrders: OrderType[] = await order.getOrders();
    return res.json(allOrders);
  } catch (error) {
    return res.status(500).json("Failed to get all orders. error:" + error);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId: number = parseInt(req.params.id);
    const currentOrder: OrderType = await order.getOrderById(orderId);
    return res.json(currentOrder);
  } catch (error) {
    return res.status(500).json("Failed to get order by id. error:" + error);
  }
};

// Get all completed orders by user id
export const getAllCompletedOrders = async (_: Request, res: Response) => {
  try {
    const currentOrder: OrderType[] = await order.getCompletedOrdersByUserId();
    return res.json(currentOrder);
  } catch (error) {
    return res
      .status(500)
      .json("Failed to get all completed orders. error:" + error);
  }
};

// Update order's status.
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const status = req.body.status as string;
    const orderId = parseInt(req.params.id as string);

    if (orderId && (status === "complete" || status === "active")) {
      const updatedOrder: OrderType = await order.updateOrderStatus(
        status,
        orderId
      );
      return res.json(updatedOrder);
    } else {
      return res.status(400).json({ Error: "Bad parameters" });
    }
  } catch (error) {
    return res.status(500).json("Failed to update order. error:" + error);
  }
};

// delete order by order id
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedOrder: OrderType = await order.deleteOrder(id);
    return res.json(deletedOrder);
  } catch (error) {
    return res.status(500).json("Failed to delete order. error:" + error);
  }
};

// create order
export const create = async (req: Request, res: Response) => {
  try {
    const newOrder: OrderType = await order.createOrder(req.body);
    return res.json(newOrder);
  } catch (error) {
    return res.status(500).json("Failed to create order. error:" + error);
  }
};

// create order
export const addProduct = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const newProduct: OrderToProductType = await order.addProductToOrder(
      id,
      req.body
    );
    return res.json(newProduct);
  } catch (error) {
    return res
      .status(500)
      .json("Failed to add product to order. error:" + error);
  }
};
