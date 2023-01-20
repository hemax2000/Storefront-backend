import supertest from "supertest";
import { UserModel } from "../models/user";
import { app } from "../../server";

const request = supertest(app);

describe("Test endpoint responses", () => {
  beforeAll(() => {
    spyOn(UserModel.prototype, "getUsers").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          firstname: "ibrahim",
          lastname: "othman",
          password: "12345678",
        },
      ])
    );
    spyOn(UserModel.prototype, "createUser").and.returnValue(
      Promise.resolve({
        firstname: "ibrahim",
        lastname: "othman",
        password: "12345678",
      })
    );
  });
  it("create user api endpoint", async () => {
    const res = await request.post("/users");
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  });
  it("gets all users api endpoint", async () => {
    const res = await request.get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        firstname: "ibrahim",
        lastname: "othman",
        password: "12345678",
      },
    ]);
  });
});
