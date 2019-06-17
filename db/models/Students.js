const dbConnection = require("../index");
const Sequelize = require("sequelize");


const Students = dbConnection.define('student', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    suspended : {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});


module.exports = Students;