import UserInfo from "../model/deviceInfoModel";
import { Request, Response } from 'express';

const GetAllUser = async (req: Request, res: Response) => {
    const user = req.cookies.user;
    try {
        if (!user) return res.status(400).json({ error: 'User not found' });
        const allUsers = await UserInfo.findAll({ where: { userid: user } });
        res.status(200).json({ allUsers: allUsers });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}
export default GetAllUser;