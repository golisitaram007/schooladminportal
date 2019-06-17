const dbConnection = require("../index");
const Sequelize = require("sequelize");


const Teachers = dbConnection.define('teacher', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
}, {
    timestamps: false
});


module.exports = Teachers;