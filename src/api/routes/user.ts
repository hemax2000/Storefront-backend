import { Router } from "express";
import { create, getAllUsers } from "../controllers/userController";

export const UserRouter = Router();

UserRouter.post("/", create);
UserRouter.get("/", getAllUsers);

export default UserRouter;
