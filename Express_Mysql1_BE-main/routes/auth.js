import express from "express";
import * as authController from "../controller/auth.js";
import * as validate from "../middleware/validator.js";
const router = express.Router();

//회원가입
router.post("/signup", validate.validate, authController.signup);
//로그인
router.post("/login", authController.login);

export default router;
