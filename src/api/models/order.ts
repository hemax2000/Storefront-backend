import client from "../database";

export type OrderType = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderToProductType = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderModel {
  // select all orders for a user
  async getOrders(): Promise<OrderType[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all orders of user. Error: ${err}`);
    }
  }
  // get order by order id
  async getOrderById(id: number): Promise<OrderType[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order. Error: ${err}`);
    }
  }

  // select completed order by user id
  async getCompletedOrdersByUserId(): Promise<OrderType[]> {
    try {
      const status = "complete";
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE status = $1";
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
      const { user_id, status } = order;

      const conn = await client.connect();
      const sql = "INSERT INTO orders (user_id, status) VALUES($1, $2)";
      const result = await conn.query(sql, [user_id, status]);
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
      const sql = "UPDATE orders SET status=$1 WHERE id=$2";
      console.log(status);
      console.log(orderId);
      const result = await conn.query(sql, [status, orderId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order status. Error: ${err}`);
    }
  }

  async deleteOrder(id: number): Promise<OrderType> {
    try {
      const sql = "DELETE FROM orders WHERE id=$1";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addProductToOrder(
    id: number,
    product: OrderToProductType
  ): Promise<OrderToProductType> {
    try {
      const sql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";

      const connection = await client.connect();

      const { product_id, quantity } = product;

      const result = await connection.query(sql, [id, product_id, quantity]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product. Error: ${err}`);
    }
  }
}
