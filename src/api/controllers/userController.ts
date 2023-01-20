import { Request, Response } from "express";
import { UserModel, UserType } from "../models/user";
import jwt from "jsonwebtoken";

const User = new UserModel();

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export const create = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, password } = req.body;

    const user: UserType = { firstname, lastname, password };

    const createduser = await User.createUser(user);
    const token = jwt.sign({ user: { id: createduser.id } }, TOKEN_SECRET);
    return res.json(token);
  } catch (error) {
    return res.status(500).json("Failed to create user");
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  const allUsers: UserType[] = await User.getUsers();
  return res.json(allUsers);
};
