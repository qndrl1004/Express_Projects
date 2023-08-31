import express from "express";
import * as commentController from "../controller/comments.js";
import { isAuth } from "../middleware/auth.js";
const commentRoute = express.Router();

commentRoute.post("/comments", isAuth, commentController.createComment);

commentRoute.get("/comments", commentController.getComment);

commentRoute.put(
  "/comments/:commentId",
  isAuth,
  commentController.updateComment
);

commentRoute.delete(
  "/comments/:commentId",
  isAuth,
  commentController.deleteComment
);

export default commentRoute;
