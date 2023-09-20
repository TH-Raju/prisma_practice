import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create-user", UserController.insertUser);
router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getSingleUser);
router.post("/profile", UserController.insertOrUpdate);

export default router;
