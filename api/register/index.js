const register = require("express").Router();
const registerHelper = require("./helper.js");
const STUDENT = "students";
const TEACHER = "teacher";

register.post("/register", (req, res, next) => {
    const { body } = req;
    const reqParams = Object.keys(body);
    try {
        if(!reqParams.includes(STUDENT) || !reqParams.includes(TEACHER)) {
            res.status(400).send({
                "message": "Invalid parameters are passed"
            })
        }else if((!Array.isArray(body[STUDENT]) || typeof body[STUDENT] !== 'string') && (typeof body[TEACHER] !== 'string')) {
            res.status(400).send({
                "message": "Request Inputs types are not valid"
            })
        }else {
            registerHelper.RegisterStudent(body, res.status(200));
        }
    } catch (e) {
        res.status(400).send({
            "message": "Registration Failed"
        });
    }
    
});

module.exports = register;