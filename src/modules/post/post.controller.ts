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
  console.log(req.query);
  const option = req.query;
  try {
    const result = await PostService.getAllPost(option);
    res.send({
      success: true,
      message: "Successfully Find Posts",
      total: result.total,
      data: result.data,
    });
  } catch (err) {
    res.send(err);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getSinglePost(parseInt(req.params.id));
    res.send({
      success: true,
      message: "Successfully Find!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};
const updatePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const result = await PostService.updatePost(id, data);
    res.send({
      success: true,
      message: "Successfully updated Post!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};
const deletePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await PostService.deletePost(id);
    res.send({
      success: true,
      message: "Successfully deleted!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const PostController = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
};
