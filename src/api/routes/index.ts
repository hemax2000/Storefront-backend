import express from "express";
import { ProductRouter } from "./product";
import { UserRouter } from "./user";
import { OrderRouter } from "./order";

const routes = (app: express.Application) => {
  app.use("/products", ProductRouter);
  app.use("/users", UserRouter);
  app.use("/orders", OrderRouter);
};

export default routes;
