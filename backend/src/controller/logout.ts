import { Request, Response } from "express";
import Info from "../model/deviceInfoModel.js";

const Logout = async (req: Request, res: Response) => {
    const user = req.cookies.user;
    const Browser = req.cookies.browser;
    const os = req.cookies.os;
    const device = req.cookies.device;
    try {
        const loged = await Info.findOne({ where: { userid: user, Browser: Browser, OS: os, Device: device } });
        if (!loged) {
            return res.status(404).json({ error: 'User not found' });
        }
        const logout = await Info.update({ logOutTime: new Date(Date.now()) }, { where: { userid: user, Browser: Browser, OS: os, Device: device } });
        if (logout) {
            for (let cookie in req.cookies) {
                res.clearCookie(cookie);
            }
            return res.status(200).json({ message: "User logged out" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

export default Logout;