import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import dotenv from "dotenv";
dotenv.config();

//회원가입
export async function signup(req, res) {
  const { nickname, password, confirm } = req.body;
  //조건식
  const rex = /^[a-zA-Z0-9]{4,20}$/;
  const nicknameCheck = rex.test(nickname);
  if (!nicknameCheck) {
    return res
      .status(412)
      .json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
  }
  if (password !== confirm) {
    return res
      .status(412)
      .json({ errorMessage: "패스워드가 일치하지 않습니다." });
  }
  if (password.search(nickname) > -1) {
    return res
      .status(412)
      .json({ errorMessage: "패스워드에 닉네임이 포함되어 있습니다." });
  }
  const found = await userRepository.findByUsername(nickname);
  if (found != null) {
    return res.status(412).json({ errorMessage: "아이디가 중복입니다." });
  }
  await userRepository.createUser({
    nickname,
    password,
  });

  res.json({ message: "회원가입에 성공하셨습니다." });
}

//로그인
export async function login(req, res) {
  const { nickname, password } = req.body;
  const user = await userRepository.findByUsername(nickname);
  if (!user) {
    return res
      .status(412)
      .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
  }
  const isValidPassword = await user.password.includes(password);
  if (!isValidPassword) {
    return res
      .status(412)
      .json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
  }
  //토큰처리
  const crtoken = createJwtToken(user.userId);
  const slicetoken1 = crtoken.slice(0, 10);
  const slicetoken2 = crtoken
    .slice(10, 20)
    .replace(/^[a-z0-9_]{4,20}$/gi, "**********");
  const token = slicetoken1 + slicetoken2;
  res.cookie("Authorization", `Bearer ${crtoken}`);
  res.json({ token: token });
}

//token생성기
const secretKey = process.env.SECRETKEY;
function createJwtToken(userId) {
  return jwt.sign({ userId }, secretKey);
}
