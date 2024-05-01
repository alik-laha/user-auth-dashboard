import express from "express";
const router = express.Router();
import Signup from "../controller/signup.js";
import CheckUser from "../middleware/checkUser.js";

router.post("/signup", CheckUser, Signup);

export default router;