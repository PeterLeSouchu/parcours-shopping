const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define class User and extend our class with sequelize's model class
class User extends Sequelize.Model {}

//Define columns of our model
User.init(
    {
        // Write column "name" with its type
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        // To connect to our client
        sequelize,
        // Name of our table
        tableName: 'users',
    }
);

module.exports = User;
