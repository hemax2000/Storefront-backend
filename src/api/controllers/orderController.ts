import { Response, Request } from "express";
import { Order } from "../models/order";
import { OrderType } from "../models/order";

const order: Order = new Order();

// Get all orders by user id
export const getAllOrders = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.user_id);
  const currentOrder: OrderType[] = await order.getOrders(userId);
  return res.json(currentOrder);
};

// Get all completed orders by user id

export const getAllCompletedOrders = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.user_id);
  const currentOrder: OrderType[] = await order.getCompletedOrdersByUserId(
    userId
  );
  return res.json(currentOrder);
};

// Update order's status.
export const updateStatus = async (req: Request, res: Response) => {
  const status = req.query.status as string;
  const orderId = parseInt(req.query.orderId as string);

  if (orderId && ["active", "complete"].includes(status)) {
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
