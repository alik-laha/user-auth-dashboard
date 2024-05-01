import { DataTypes } from "sequelize";
import sequelize from "../config/dataBaseConfig.js";
import User from "./userModel.js";

const Verification = sequelize.define('Verify', {

    userid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: User,
            key: 'userid'
        }
    },
    verificationExpiry: {
        type: DataTypes.DATE,
        defaultValue: false
    },
    verifyToken: {
        type: DataTypes.STRING
    },
});

export default Verification;