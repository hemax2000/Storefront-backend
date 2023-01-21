import client from "../database";
import bcrypt from "bcrypt";

export type UserType = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

const { PEPPER } = process.env;
export class UserModel {
  async getUsers(): Promise<UserType[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all users. Error: ${err}`);
    }
  }
  async createUser(user: UserType): Promise<UserType> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users ( firstname, lastname, password ) VALUES($1, $2, $3 ) RETURNING *";

      const hashedPassword = bcrypt.hashSync(user.password + PEPPER, 12);
      console.log(hashedPassword);

      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        hashedPassword,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to add the user with the following error: ${error}`
      );
    }
  }

  async updateUser(id: number, user: UserType): Promise<UserType> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE users SET firstname = $2, lastname = $3, password = $4 WHERE id = $1 RETURNING *";

      const hashedPassword = bcrypt.hashSync(user.password + PEPPER, 12);
      console.log(hashedPassword);

      const result = await conn.query(sql, [
        id,
        user.firstname,
        user.lastname,
        hashedPassword,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to update the user with the following error: ${error}`
      );
    }
  }
  async deleteUser(id: number): Promise<UserModel> {
    try {
      const sql = "DELETE FROM users WHERE id=$1 RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
