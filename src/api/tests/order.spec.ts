import { OrderModel } from "../models/order";
import { app } from "../../server";
import supertest from "supertest";

const request = supertest(app);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjY5ODM2MzI0fQ.MxfHSPSbtL7h8bHitsN6aJABLwQPcivKzVldtujJ-5U";

describe("Test Order endpoint responses", () => {
  beforeAll(() => {
    spyOn(OrderModel.prototype, "createOrder").and.returnValue(
      Promise.resolve({
        id: 2,
        user_id: 2,
        status: "active",
      })
    );
    spyOn(OrderModel.prototype, "getOrderById").and.returnValue(
      Promise.resolve({
        id: 1,
        user_id: 2,
        status: "active",
      })
    );
    spyOn(OrderModel.prototype, "getOrders").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          user_id: 2,
          status: "complete",
        },
        {
          id: 2,
          user_id: 2,
          status: "active",
        },
      ])
    );
    spyOn(OrderModel.prototype, "getCompletedOrdersByUserId").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          user_id: 2,
          status: "complete",
        },
      ])
    );
    spyOn(OrderModel.prototype, "updateOrderStatus").and.returnValue(
      Promise.resolve({
        id: 1,
        user_id: 2,
        status: "active",
      })
    );
    spyOn(OrderModel.prototype, "deleteOrder").and.returnValue(
      Promise.resolve({
        id: 1,
        user_id: 2,
        status: "active",
      })
    );
    spyOn(OrderModel.prototype, "addProductToOrder").and.returnValue(
      Promise.resolve({
        id: 1,
        product_id: 2,
        order_id: 1,
        quantity: 5,
      })
    );
  });

  it("create order api endpoint", async () => {
    const res = await request
      .post("/orders")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      user_id: 2,
      status: "active",
    });
  });
  it("gets all orders api endpoint", async () => {
    const res = await request
      .get("/orders")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        user_id: 2,
        status: "complete",
      },
      {
        id: 2,
        user_id: 2,
        status: "active",
      },
    ]);
  });
  it("gets completed user order api endpoint", async () => {
    const res = await request
      .get("/orders/completed")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        user_id: 2,
        status: "complete",
      },
    ]);
  });
  it("delets a user order api endpoint", async () => {
    const res = await request
      .delete("/orders/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      user_id: 2,
      status: "active",
    });
  });

  it("update a user order api endpoint", async () => {
    const res = await request
      .put("/orders/1")
      .set("Authorization", "Bearer " + token)
      .send({ status: "complete" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      user_id: 2,
      status: "active",
    });
  });

  it("get user order by id api endpoint", async () => {
    const res = await request
      .get("/orders/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      user_id: 2,
      status: "active",
    });
  });
  it("add product to order by id api endpoint", async () => {
    const res = await request
      .post("/orders/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      product_id: 2,
      order_id: 1,
      quantity: 5,
    });
  });
});
