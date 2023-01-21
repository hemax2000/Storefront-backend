import { Router } from "express";
import {
  create,
  deleteUser,
  getAllUsers,
  update,
} from "../controllers/userController";
import { auth } from "../middlewares/auth";

export const UserRouter = Router();

UserRouter.post("/", create);
UserRouter.get("/", getAllUsers);
UserRouter.put("/:id", auth, update);
UserRouter.delete("/:id", auth, deleteUser);

export default UserRouter;
