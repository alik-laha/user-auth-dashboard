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
        type: DataTypes.BIGINT,
    },
    verifyToken: {
        type: DataTypes.STRING
    },
});

export default Verification;