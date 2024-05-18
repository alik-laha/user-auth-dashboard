import express from "express";
const router = express.Router();
import Signup from "../controller/signup";
import CheckUser from "../middleware/checkUser";
import Login from "../controller/login";
import VerifyEmail from "../controller/verifyEmailCode";
import VerifyUser from "../controller/verifyUser";
import Logout from "../controller/logout";
import ResendCode from "../controller/resendCode";
import { VerifyEmailRoute, VeryifyLogedIN } from "../controller/verfyWhereToRoute";
import GetAllUser from "../controller/getallUser";

router.post("/signup", CheckUser, Signup);

router.get("/", (req, res) => {
    res.send("Hello World");
})

router.put("/login", Login)

router.post("/verifyemail", VerifyEmail);

router.get("/verifyuser", VerifyUser);

router.get("/logout/:id", Logout);

router.get("/resendcode", ResendCode);

router.get("/VerifyEmailRoute", VerifyEmailRoute);

router.get("/VeryifyLogedIN", VeryifyLogedIN);

router.get("/getalluser", GetAllUser);

export default router;