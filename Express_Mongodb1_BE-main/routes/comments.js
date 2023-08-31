import express from "express";
import commentModel from "../schemas/comments.js";
const commentRoute = express.Router();

//댓글 작성
commentRoute.post("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { user, password, content } = req.body;

  await commentModel.create({
    postId: _postId,
    user,
    password,
    content,
  });

  res.json({
    message: "댓글을 생성하였습니다.",
  });
});

//댓글 목록 조회
commentRoute.get("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const selectcollect = await commentModel.find({ postId: _postId });
  const arr = [];
  for (let i = 0; i < selectcollect.length; i++) {
    const temp = {
      commentId: selectcollect[i]._id,
      user: selectcollect[i].user,
      content: selectcollect[i].content,
      createdAt: selectcollect[i].createdAt,
    };
    arr.push(temp);
  }
  res.json({ data: [arr] });
});

//댓글 수정
commentRoute.put("/:_commentId", async (req, res) => {
  const { password, content } = req.body;
  await commentModel.findByIdAndUpdate(
    req.params._commentId,
    {
      password: password,
      content: content,
    },
    {
      new: true,
    }
  );
  res.json({ message: "댓글을 수정하였습니다." });
});

// 댓글 삭제
commentRoute.delete("/:_commentId", async (req, res) => {
  const { _commentId } = req.params;
  const { password } = req.body;
  const commentdelete = await commentModel.findById(_commentId);
  if (commentdelete.password === password) {
    await commentModel.deleteOne({ _id: _commentId });
    res.json({ message: "게시글을 삭제하였습니다." });
  }
});

export default commentRoute;
