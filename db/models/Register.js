const dbConnection = require("../index");
const Sequelize = require("sequelize");


const Register = dbConnection.define('register', {
    teacherId: Sequelize.INTEGER,
    studentId : Sequelize.INTEGER
}, {
    timestamps: false
});

module.exports = Register;