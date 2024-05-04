import express from "express";
const app = express();
import cors from "cors";
import cookiePerser from "cookie-parser";
import UserRouter from "./router/userRouter";


app.use(cors());
app.use(cookiePerser());
app.use(express.json());

app.use("/api/user", UserRouter);


export default app