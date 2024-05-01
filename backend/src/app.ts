import express from "express";
const app = express();
import cors from "cors";
import cookiePerser from "cookie-parser";


app.use(cors());
app.use(cookiePerser());
app.use(express.json());



export default app