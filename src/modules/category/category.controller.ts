import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const insertCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.insertCategory(req.body);
    res.send({
      success: true,
      message: "Successfully Added",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const CategoryController = {
  insertCategory,
};
