import { DataTypes } from "sequelize";
import sequelize from "../config/dataBaseConfig.js";

sequelize.sync()
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing models:', error);
    });

const User = sequelize.define('User', {
    userid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isVerifyed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    verifyToken: {
        type: DataTypes.STRING
    },
});

export default User;