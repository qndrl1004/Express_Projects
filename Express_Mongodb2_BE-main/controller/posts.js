import * as postRepository from "../model/posts.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function createPost(req, res) {
  const { title, content } = req.body;
  const token = req.headers.cookie;
  const authToken = token.split("20")[1];
  const decodedToken = jwt.decode(authToken);

  await postRepository.create(
    title,
    content,
    decodedToken.userId,
    decodedToken.nickname
  );
  res.status(201).json({ message: "게시글 작성에 성공하였습니다." });
}

export async function getPost(req, res) {
  const data = await postRepository.getAll();
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    const temp = {
      postId: data[i].postId,
      userId: data[i].userId,
      nickname: data[i].nickname,
      title: data[i].title,
      content: data[i].content,
      createdAt: data[i].createdAt,
      updatedAt: data[i].updatedAt,
    };
    arr.push(temp);
  }
  res.status(200).json({ posts: arr });
}

export async function getDetailPost(req, res) {
  const { postId } = req.params;
  const detailPost = await postRepository.getById(parseInt(postId));
  const temp = {
    postId: detailPost[0].postId,
    userId: detailPost[0].userId,
    nickname: detailPost[0].nickname,
    title: detailPost[0].title,
    content: detailPost[0].content,
    createdAt: detailPost[0].createdAt,
    updatedAt: detailPost[0].updatedAt,
  };
  res.json({ data: temp });
}

export async function updatePost(req, res) {
  const { postId } = req.params;
  const { title, content } = req.body;
  await postRepository.update(postId, title, content);
  res.json({ message: "게시글을 수정하였습니다." });
}

export async function deletePost(req, res) {
  const { postId } = req.params;
  await postRepository.remove(postId);
  res.json({ message: "게시글을 삭제하였습니다." });
}
