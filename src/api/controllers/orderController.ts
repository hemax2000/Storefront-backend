import { Response, Request } from "express";
import { OrderModel } from "../models/order";
import { OrderType, OrderToProductType } from "../models/order";

const order: OrderModel = new OrderModel();

// Get all orders by user id
export const getAllOrders = async (_: Request, res: Response) => {
  const allOrders: OrderType[] = await order.getOrders();
  return res.json(allOrders);
};

export const getOrderById = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id);
  const currentOrder: OrderType[] = await order.getOrderById(orderId);
  return res.json(currentOrder);
};

// Get all completed orders by user id
export const getAllCompletedOrders = async (_: Request, res: Response) => {
  const currentOrder: OrderType[] = await order.getCompletedOrdersByUserId();
  return res.json(currentOrder);
};

// Update order's status.
export const updateStatus = async (req: Request, res: Response) => {
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
};

// delete order by order id
export const deleteOrder = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const deletedOrder: OrderType = await order.deleteOrder(id);
  return res.json(deletedOrder);
};

// create order
export const create = async (req: Request, res: Response) => {
  const newOrder: OrderType = await order.createOrder(req.body);
  return res.json(newOrder);
};

// create order
export const addProduct = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const newProduct: OrderToProductType = await order.addProductToOrder(
    id,
    req.body
  );
  return res.json(newProduct);
};
