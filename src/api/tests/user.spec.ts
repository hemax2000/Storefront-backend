import supertest from "supertest";
import { UserModel } from "../models/user";
import { app } from "../../server";

const request = supertest(app);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjY5ODM2MzI0fQ.MxfHSPSbtL7h8bHitsN6aJABLwQPcivKzVldtujJ-5U";

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
    spyOn(UserModel.prototype, "updateUser").and.returnValue(
      Promise.resolve({
        firstname: "ibrahim",
        lastname: "alnumair",
        password: "12345678",
      })
    );
    spyOn(UserModel.prototype, "deleteUser").and.returnValue(
      Promise.resolve({
        id: 1,
        firstname: "ibrahim",
        lastname: "othman",
        password: "12345678",
      })
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

  it("update user api endpoint", async () => {
    const res = await request
      .put("/users/1")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it("delete user api endpoint", async () => {
    const res = await request
      .delete("/users/1")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      firstname: "ibrahim",
      lastname: "othman",
      password: "12345678",
    });
  });
});
