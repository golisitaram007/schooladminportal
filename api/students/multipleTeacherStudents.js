const Sequelize = require("sequelize");
const models = require('../../db/models');
const Op = Sequelize.Op;

async function multipleTeacherStudents(queryVal, restStatus) {
    const teachers = await models.teachers.findAll({
        where: {
            email: {
                [Op.in]: queryVal
            }
        }
    });
    if(teachers.length) {
        const registers = await models.register.findAll({
            where: {
                teacherId: {
                    [Op.in]: teachers.map(teacher => teacher.get('id'))
                }
            }
        });
        const students = await models.students.findAll({
            where: {
                id: {
                    [Op.in]: registers.map(register => register.get('studentId'))
                }
            }
        });
        restStatus.status(200)
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


module.exports = multipleTeacherStudents;