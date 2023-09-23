import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/create-post", PostController.createPost);
router.get("/:id", PostController.getSinglePost);
router.get("/", PostController.getAllPost);
router.patch("/update/:id", PostController.updatePost);

export const PostRouter = router;
