const mysql = require('mysql2');
const Sequelize = require("sequelize");

const sequelize = new Sequelize('mysql://0t572oJaYc:H9mDQ0iQCR@remotemysql.com:3306/0t572oJaYc');

module.exports = sequelize;