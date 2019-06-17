const commonStudents = require("express").Router();
const singleTeacherStudents = require('./singleTeacherStudents');
const multipleTeacherStudents = require('./multipleTeacherStudents');

const TEACHER = 'teacher';


commonStudents.get("/commonstudents", (req, res, next) => {

    if(typeof req.query[TEACHER] === 'string') {
        singleTeacherStudents(req.query[TEACHER], res);
    }else if( Array.isArray(req.query[TEACHER]) ) {
        multipleTeacherStudents(req.query[TEACHER], res);
    }else {
        res.status(400).send({
            "message": "Teacher data type is not as expected"
        });
    }
});

module.exports = commonStudents;