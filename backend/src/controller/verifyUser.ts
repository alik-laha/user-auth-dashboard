import { Request, Response } from "express";
import UserInfo from "../model/deviceInfoModel.js";

const VerifyUser = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    const user = req.cookies.user;
    try {
        if (!token) {
            return res.status(400).json({ error: "Token not found" });
        }
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const Informaion: any = await UserInfo.findOne({ where: { token: token, userid: user } });
        if (!Informaion) {
            return res.status(404).json({ error: "Token not found" });
        }
        if (token === Informaion.token) {
            return res.status(200).json({ message: "User verified" });
        }
        return res.status(400).json({ error: "Invalid token" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
export default VerifyUser;