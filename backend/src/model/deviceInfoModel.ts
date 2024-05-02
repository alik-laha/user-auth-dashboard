import { DataTypes } from "sequelize";
import sequelize from "../config/dataBaseConfig.js";
import User from "./userModel.js";

const UserInfo = sequelize.define('UserInfo', {

    userid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: User,
            key: 'userid'
        }
    },
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    OS: {
        type: DataTypes.STRING,
    },
    Browser: {
        type: DataTypes.STRING
    },
    Device: {
        type: DataTypes.STRING
    }
});

export default UserInfo;