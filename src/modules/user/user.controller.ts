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

export const UserController = {
  insertUser,
};
