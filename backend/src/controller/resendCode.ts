import { Request, Response } from "express";
import Verification from "../model/verificationModel.js";
import { VerifyEmail } from "../helper/mailer.js";
import crypto from "crypto";
import User from "../model/userModel.js";

const ResendCode = async (req: Request, res: Response) => {
    const user = req.cookies.user;
    try {
        const code = crypto.randomBytes(3).toString('hex');

        const VerificationData: any = await Verification.findOne({ where: { userid: user } });

        const userData: any = await User.findOne({ where: { userid: user } });

        if (!VerificationData) {

            await Verification.create({ userid: user, verifyToken: code, verificationExpiry: Date.now() + 600000 });
            const Mail = await VerifyEmail({ email: userData.email, id: code });

            if (Mail) {

                return res.status(200).json({ message: "Verification code sent" });

            }

            return res.status(500).json({ error: 'Server error' });

        }

        VerificationData.verifyToken = code;
        VerificationData.verificationExpiry = Date.now() + 600000;
        await VerificationData.save();
        const Mail = await VerifyEmail({ email: userData.email, id: code });

        if (Mail) {

            return res.status(200).json({ message: "Verification code sent" });

        }
        return res.status(500).json({ error: 'Server error' });

    } catch (err) {

        console.log(err);
        return res.status(500).json({ error: 'Server error' });

    }
}
export default ResendCode;