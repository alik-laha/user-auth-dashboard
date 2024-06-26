import User from "../model/userModel";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Verification from "../model/verificationModel";
import { VerifyEmail } from "../helper/mailer";
import crypto from "crypto";

const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user: any = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ error: 'Email is not registered' });
        }
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(401).json({ error: 'Invalid password please check' });
        }
        const verify = crypto.randomBytes(3).toString("hex");
        const Mail = await VerifyEmail({ email, id: verify });
        if (Mail) {
            const VerificationData = await Verification.findOne({ where: { userid: user.userid } });
            if (VerificationData) {
                await Verification.update({ verifyToken: verify, verificationExpiry: Date.now() + 600000 }, { where: { userid: user.userid } });
            }
            res.cookie("user", user.userid, { httpOnly: true });
            return res.status(200).json({ message: 'Login successful', id: user.userid });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

export default Login;