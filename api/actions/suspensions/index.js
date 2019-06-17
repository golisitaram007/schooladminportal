const suspend = require("express").Router();
const models = require('../../../db/models');
const STUDENT = 'student';


suspend.post("/suspend",async (req, res, next) => {
    const updateStudent = await models.students.update({
        suspended: true,
    },{
        where: {
            email: req.body[STUDENT]
        }
    });
    if(updateStudent.length) {
        res.status(204).send();
    }
});

module.exports = suspend;