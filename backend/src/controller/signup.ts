import User from "../model/userModel";
import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import Verification from "../model/verificationModel";
import { VerifyEmail } from "../helper/mailer";

const Signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const id = crypto.randomBytes(8).toString("hex")
        const pass = await bcrypt.hash(password, 10);
        const oldUser = await User.findOne({ where: { email: email } });
        const verify = crypto.randomBytes(3).toString("hex")
        if (oldUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
        const newUser = await User.create({
            userid: id,
            username: name,
            email: email,
            password: pass
        });
        if (newUser) {
            const Mail = await VerifyEmail({ email, id: verify });
            if (Mail) {
                const VerificationData = await Verification.create({
                    userid: id,
                    verifyToken: verify,
                    verificationExpiry: Date.now() + 600000
                });
                if (VerificationData) {
                    res.cookie('user', id, { httpOnly: true, secure: true });
                    return res.status(201).json({ message: 'User created successfully', id });
                }
            }
            else {
                await User.destroy({ where: { email: email } });
                return res.status(400).json({ error: 'User not created' });
            }
        }
        else {
            return res.status(400).json({ error: 'User not created' });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
export default Signup;
