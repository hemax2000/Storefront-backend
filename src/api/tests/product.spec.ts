import supertest from "supertest";
import { ProductModel } from "../models/product";
import { app } from "../../server";

const request = supertest(app);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjY5ODM2MzI0fQ.MxfHSPSbtL7h8bHitsN6aJABLwQPcivKzVldtujJ-5U";

describe("Test Product endpoint responses", () => {
  beforeAll(() => {
    spyOn(ProductModel.prototype, "getProducts").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          name: "iphone",
          price: 3000,
          category: "phone",
        },
      ])
    );
    spyOn(ProductModel.prototype, "getProductById").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "iphone",
        price: 3000,
        category: "phone",
      })
    );
    spyOn(ProductModel.prototype, "createProduct").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "iphone",
        price: 3000,
        category: "phone",
      })
    );
    spyOn(ProductModel.prototype, "deleteProduct").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "iphone",
        price: 3000,
        category: "phone",
      })
    );
    spyOn(ProductModel.prototype, "updateProduct").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "iphone",
        price: 3000,
        category: "phone",
      })
    );
  });

  it("gets all products api endpoint", async () => {
    const res = await request.get("/products");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        name: "iphone",
        price: 3000,
        category: "phone",
      },
    ]);
  });
  it("gets product by id api endpoint", async () => {
    const res = await request.get("/products/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "iphone",
      price: 3000,
      category: "phone",
    });
  });
  it("create product api endpoint", async () => {
    const res = await request
      .post("/products")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "iphone",
      price: 3000,
      category: "phone",
    });
  });
  it("delete a product api endpoint", async () => {
    const res = await request
      .delete("/products/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "iphone",
      price: 3000,
      category: "phone",
    });
  });
  it("update a product api endpoint", async () => {
    const res = await request
      .put("/products/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "iphone",
      price: 3000,
      category: "phone",
    });
  });
});
