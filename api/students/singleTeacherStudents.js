const Sequelize = require("sequelize");
const models = require('../../db/models');
const Op = Sequelize.Op;

async function singleTeacherStudents(queryVal, resStatus) {
    const teacher = await models.teachers.findOne({
        where: {
            email: queryVal
        }
    });
    if(teacher) {
        const registers = await models.register.findAll({
            where: {
                teacherId: teacher.get('id')
            }
        });
        const students = await models.students.findAll({
            where: {
                id: {
                    [Op.in]: registers.map(register => register.get('studentId'))
                }
            }
        });
        resStatus.status(200)
           .send({
                students: students.map(student => student.get('email'))
           })
    }else {
        resStatus.status(400)
            .send({
                "message": "No Teacher found for given email"
            })
    }
}


module.exports = singleTeacherStudents;