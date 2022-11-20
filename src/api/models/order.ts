import client from "../database";

export type OrderType = {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class Order {
  // select all orders for a user
  async getOrders(userId: number): Promise<OrderType[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM order WHERE user_id=$1";
      const result = await conn.query(sql, [userId]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all orders of user. Error: ${err}`);
    }
  }

  // select completed order by user id
  async getCompletedOrdersByUserId(userId: number): Promise<OrderType[]> {
    try {
      const status = "complete";
      const conn = await client.connect();
      const sql = `SELECT * FROM order WHERE user_id = ${userId} AND status = $1`;
      const result = await conn.query(sql, [status]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`);
    }
  }

  // create an order
  async createOrder(order: OrderType): Promise<OrderType> {
    try {
      const { product_id, quantity, user_id, status } = order;

      const conn = await client.connect();
      const sql =
        "INSERT INTO order (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4)";
      const result = await conn.query(sql, [
        product_id,
        quantity,
        user_id,
        status,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }

  // update an order
  async updateOrderStatus(status: string, orderId: number): Promise<OrderType> {
    try {
      const conn = await client.connect();
      const sql = "UPDATE order SET status=$1 WHERE id=$2";
      const result = await conn.query(sql, [status, orderId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order status. Error: ${err}`);
    }
  }

  async deleteOrder(id: number): Promise<OrderType> {
    try {
      const sql = "DELETE FROM order WHERE id=$1";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
