import express from "express";
const router = express.Router();
import Signup from "../controller/signup.js";
import CheckUser from "../middleware/checkUser.js";
import Login from "../controller/login.js";
import VerifyEmail from "../controller/verifyEmailCode.js";
import VerifyUser from "../controller/verifyUser.js";
import Logout from "../controller/logout.js";
import ResendCode from "../controller/resendCode.js";
import { VerifyEmailRoute, VeryifyLogedIN } from "../controller/verfyWhereToRoute.js";

router.post("/signup", CheckUser, Signup);

router.put("/login", Login)

router.post("/verifyemail", VerifyEmail);

router.get("/verifyuser", VerifyUser);

router.get("/logout/:id", Logout);

router.get("/resendcode", ResendCode);

router.get("/VerifyEmailRoute", VerifyEmailRoute);

router.get("/VeryifyLogedIN", VeryifyLogedIN);


export default router;