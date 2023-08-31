import express from "express";
import postModel from "../schemas/posts.js";
const postRoute = express.Router();

//게시글 작성
postRoute.post("/", async (req, res) => {
  const { user, password, title, content } = req.body;
  await postModel.create({
    user,
    password,
    title,
    content,
  });

  res.json({ message: "게시글을 생성하였습니다." });
});

//게시글 조회
postRoute.get("/", async (req, res) => {
  const selectcollect = await postModel.find({});

  const arr = [];

  for (let i = 0; i < selectcollect.length; i++) {
    const temp = {
      postId: selectcollect[i]._id,
      user: selectcollect[i].user,
      content: selectcollect[i].content,
      createdAt: selectcollect[i].createdAt,
    };
    arr.push(temp);
  }

  res.json({ data: [...arr] });
});

//게시글 상세 조회
postRoute.get("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const selectDetail = await postModel.findById(_postId);
  const temp = {
    postId: selectDetail._id,
    user: selectDetail.user,
    title: selectDetail.title,
    content: selectDetail.content,
    createdAt: selectDetail.createdAt,
  };
  res.json({ data: [temp] });
});

//게시글 수정
postRoute.put("/:_postId", async (req, res) => {
  const { password, title, content } = req.body;
  await postModel.findByIdAndUpdate(
    req.params._postId,
    {
      password: password,
      title: title,
      content: content,
    },
    {
      new: true,
    }
  );
  res.json({ message: "게시글을 수정하였습니다." });
});

// 게시글 삭제
postRoute.delete("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;
  const postdelete = await postModel.findById(_postId);
  if (postdelete.password === password) {
    await postModel.deleteOne({ _id: _postId });
    res.json({ message: "게시글을 삭제하였습니다." });
  }
});

export default postRoute;
