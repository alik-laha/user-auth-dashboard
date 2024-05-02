import { Request, Response } from "express";
import User from "../model/userModel.js";
import Jwt, { JwtPayload } from "jsonwebtoken";

const VerifyUser = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return res.status(400).json({ error: "Token not found" });
        }
        const Decode = Jwt.verify(token, process.env.JWT_SECRET!);
        if (!Decode) {
            return res.status(400).json({ error: "Invalid token" });
        }

        const user = await User.findOne({ where: { userid: (Decode as JwtPayload).id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User verified" });


    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
export default VerifyUser;