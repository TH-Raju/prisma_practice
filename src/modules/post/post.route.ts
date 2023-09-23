import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/create-post", PostController.createPost);
router.get("/:id", PostController.getSinglePost);
router.get("/", PostController.getAllPost);
router.patch("/update/:id", PostController.updatePost);
router.delete("/delete/post/:id", PostController.deletePost);
router.get("/l/learn-query", PostController.learnAggrigateAndGrouping);

export const PostRouter = router;
