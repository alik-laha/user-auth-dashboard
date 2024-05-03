import { Request, Response } from "express"
import User from "../model/userModel.js"


export const VerifyEmailRoute = async (req: Request, res: Response) => {
    const user = req.cookies.user
    const token = req.cookies.token
    try {
        if (!token && user) {
            const userData: any = await User.findOne({ where: { userid: user } });
            if (!userData) {
                return res.status(404).json({ message: "User not found" })
            }
            return res.status(200).json({ message: "User found" })
        }
        return res.status(403).json({ message: "Token exsist" })


    } catch (err) {
        return res.status(500).json({ message: "server Error" })
    }

}


export const VeryifyLogedIN = async (req: Request, res: Response) => {
    const user = req.cookies.user
    const token = req.cookies.token
    try {
        if (!token && !user) {
            return res.status(200).json({ message: "user Not need" })
        }
        else {
            return res.status(403).json({ message: "Token exsist" })
        }

    } catch (err) {
        return res.status(500).json({ message: "server Error" })
    }
}