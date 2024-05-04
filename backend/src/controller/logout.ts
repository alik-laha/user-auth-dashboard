import { Request, Response } from "express";
import Info from "../model/deviceInfoModel";
import { LoggedOut } from "../helper/mailer";
import User from "../model/userModel";

const Logout = async (req: Request, res: Response) => {
    const user = req.cookies.user;
    const id = req.cookies.id;
    try {
        const checkUser: any = await User.findOne({ where: { userid: user } });
        const loged: any = await Info.findOne({ where: { id: id } });
        if (!loged) {
            return res.status(404).json({ error: 'User not found' });
        }
        const logout = await Info.destroy({ where: { id: id } });

        if (logout) {
            for (let cookie in req.cookies) {
                res.clearCookie(cookie);
            }
            await LoggedOut({ email: checkUser.email, os: loged.OS, browser: loged.Browser, device: loged.Device });

            return res.status(200).json({ message: "User logged out" });


        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

export default Logout;