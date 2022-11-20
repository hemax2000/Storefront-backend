import { Request, Response } from "express";
import { UserModel, UserType } from "../models/user";
import jwt from "jsonwebtoken";

const User = new UserModel();

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export const create = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, password } = req.body;
    if (!(firstname && lastname && password)) {
      return res
        .status(400)
        .send(
          "Error, missing or malformed parameters. (firstname , lastname ,password) are  required"
        );
    }

    const user: UserType = { firstname, lastname, password };

    const createduser = await User.create(user);
    const token = jwt.sign({ user: { id: createduser.id } }, TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(500).json("Failed to create user");
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  const allUsers: UserType[] = await User.getUsers();
  return res.json(allUsers);
};
