import * as commentRepository from "../model/comments.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function createComment(req, res) {
  const { comment } = req.body;
  const token = req.headers.cookie;
  const authToken = token.split("20")[1];
  const decodedToken = jwt.decode(authToken);
  await commentRepository.create(
    comment,
    decodedToken.userId,
    decodedToken.nickname
  );
  res.status(201).json({ message: "댓글 작성에 성공하였습니다." });
}

export async function getComment(req, res) {
  const data = await commentRepository.getAll();
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    const temp = {
      commentId: data[i].commentId,
      userId: data[i].userId,
      nickname: data[i].nickname,
      comment: data[i].comment,
      createdAt: data[i].createdAt,
      updatedAt: data[i].updatedAt,
    };
    arr.push(temp);
  }
  res.status(200).json({ comments: arr });
}

export async function updateComment(req, res) {
  const { commentId } = req.params;
  const { comment } = req.body;
  await commentRepository.update(commentId, comment);
  res.json({ message: "댓글을 수정하였습니다." });
}

export async function deleteComment(req, res) {
  const { commentId } = req.params;
  await commentRepository.remove(commentId);
  res.json({ message: "댓글을 삭제하였습니다." });
}
