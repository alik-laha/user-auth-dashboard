import User from "../model/userModel.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_Time });
        res.cookie('token', token, { httpOnly: true })
        res.cookie("user", user.userid, { httpOnly: true });
        return res.status(200).json({ message: 'Login successful', verify: user.isVerifyed });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

export default Login;