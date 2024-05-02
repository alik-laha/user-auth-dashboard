import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../model/userModel.js";
import Verification from "../model/verificationModel.js";
import { LoggedIn } from "../helper/mailer.js";
import UserInfo from "../model/deviceInfoModel.js";
import { v4 as uuidv4 } from 'uuid';


const VerifyEmailCode = async (req: Request, res: Response) => {
    const { code } = req.body;
    const user = req.cookies.user;
    const id = uuidv4();
    try {
        const VerificationData: any = await Verification.findOne({ where: { userid: user } });
        if (!VerificationData) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (VerificationData.verificationExpiry < Date.now()) {
            return res.status(400).json({ error: 'Verification code expired' });
        }
        if (VerificationData.verifyToken !== code) {
            return res.status(400).json({ error: 'Invalid code' });
        }
        const userdata: any = await User.findOne({ where: { userid: user } })

        const userAgentString = req.headers["user-agent"]!;

        const osRegex = /\(([^)]+)\)/;
        const browserRegex = /(?:Chrome|Firefox|Safari)\/([\d.]+)/;
        const deviceRegex = /Mobile|Tablet|iPhone|iPad|Android/;

        // Extracting OS information
        const osMatch = userAgentString.match(osRegex);
        const osInfo = osMatch ? osMatch[1] : "Unknown OS";

        // Extracting browser information
        const browserMatch = userAgentString.match(browserRegex);
        const browserInfo = browserMatch ? browserMatch[0] : "Unknown Browser";

        // Extracting device information
        const deviceInfo = userAgentString.match(deviceRegex) ? "Mobile/Tablet" : "Desktop";

        const UserInfoData = await UserInfo.create({
            id: id,
            userid: user,
            OS: osInfo,
            Browser: browserInfo,
            Device: deviceInfo
        });
        if (UserInfoData) {
            const Mail = await LoggedIn({ email: userdata.email, id: code });
            if (Mail) {
                jwt.sign({ id: userdata.userid }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_Time }, (err, token) => {
                    if (err) {
                        return res.status(500).json({ error: 'Server error' });
                    }
                    res.cookie('token', token, { httpOnly: true, secure: true });
                    return res.status(200).json({ message: 'Verification successful' });
                });
            }
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
export default VerifyEmailCode;