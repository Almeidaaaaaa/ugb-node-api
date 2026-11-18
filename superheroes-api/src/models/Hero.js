const { DataTypes } = require("sequelize");  // require mesma coisa que import from 

const sequelize = require("../database/database.js"); // sequelize faz a conversão para o banco 

const Hero = sequelize.define("Hero", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    universe: {
        type: DataTypes.STRING,
        allowNull: false
    },

    power: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Hero;