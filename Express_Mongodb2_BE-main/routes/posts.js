import express from "express";
import * as postController from "../controller/posts.js";
import { isAuth } from "../middleware/auth.js";
const postRoute = express.Router();

postRoute.post("/", isAuth, postController.createPost);

postRoute.get("/", postController.getPost);

postRoute.get("/:postId", postController.getDetailPost);

postRoute.put("/:postId", isAuth, postController.updatePost);

postRoute.delete("/:postId", isAuth, postController.deletePost);

export default postRoute;
