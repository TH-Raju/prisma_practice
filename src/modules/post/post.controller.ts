import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.insertPost(req.body);
    res.send({
      success: true,
      message: "Successfully Posted",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getAllPost();
    res.send({
      success: true,
      message: "Successfully Find Posts",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const PostController = {
  createPost,
  getAllPost,
};
