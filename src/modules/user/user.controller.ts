import { Request, Response } from "express";
import { UserService } from "./user.service";

const insertUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertUser(req.body);
    res.send({
      success: true,
      message: "Successfully Added!!!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();
  res.send({
    success: true,
    message: "Successfully Find",
    data: result,
  });
};

export const UserController = {
  insertUser,
  getAllUser,
};
