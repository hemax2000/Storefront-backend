import client from "../database";

export type ProductType = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  // select all products
  async getProducts(): Promise<ProductType[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all products. Error: ${err}`);
    }
  }

  // select product by product id
  async getProductById(productId: number): Promise<ProductType> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id=$1";
      const result = await conn.query(sql, [productId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product by id. Error: ${err}`);
    }
  }

  // create product
  async createProduct(product: ProductType): Promise<ProductType> {
    try {
      const { name, price, category } = product;
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [name, price, category]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product. Error: ${err}`);
    }
  }

  // update product
  async updateProduct(id: number, product: ProductType): Promise<ProductType> {
    try {
      const { name, price, category } = product;
      const sql =
        "UPDATE products SET name = $2, price = $3, category = $4 WHERE id = $1 RETURNING *";

      const conn = await client.connect();
      const result = await conn.query(sql, [id, name, price, category]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product. Error: ${err}`);
    }
  }
  // delete product
  async deleteProduct(id: number): Promise<ProductType> {
    try {
      const sql = "DELETE FROM products WHERE id=$1 RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
