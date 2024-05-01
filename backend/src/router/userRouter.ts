import express from "express";
const router = express.Router();
import Signup from "../controller/signup.js";
import CheckUser from "../middleware/checkUser.js";
import Login from "../controller/login.js";

router.post("/signup", CheckUser, Signup);

router.put("/login", Login)
export default router;