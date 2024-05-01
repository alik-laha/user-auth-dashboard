import User from "../model/userModel.js";
import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { VerifyEmail } from "../helper/mailer.js";


const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const oldUser = await User.findOne({ where: { email } });


        if (oldUser) return res.status(409).json({ message: "User already exists" });
        const id = crypto.randomBytes(8).toString("hex");
        const pass = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            userid: id,
            username: name,
            email: email,
            password: pass,
        });
        if (newUser) {
            const Mail = await VerifyEmail({ email, id });
            if (Mail) {
                jwt.sign({ id: id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_Time }, (err, token) => {
                    if (err) {
                        return res.status(400).json({ error: 'Server error' });
                    }
                    res.cookie('token', token, { httpOnly: true });
                    res.cookie('user', id, { httpOnly: true });
                    return res.status(201).json({ message: 'User created successfully' });
                });
            }
            return res.status(400).json({ message: "Something went wrong" });
        }


    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export default signup;
