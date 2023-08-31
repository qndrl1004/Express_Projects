import dotenv from "dotenv";
import db from "./DB/db.js";
import express from "express";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import userRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
db();

app.use("/posts", postRoute);
app.use("/posts/:postId", commentRoute);
app.use("/", userRoute);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
