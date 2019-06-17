const Sequelize = require("sequelize");
const models = require('../../db/models');
const Op = Sequelize.Op;

async function RegisterStudent(body, executeResponse) {
    let teacher, students;
    teacher = await models.teachers.findOne({
        where: {
            email: body.teacher
        }
    });
    if(Array.isArray(body.students)) {
        students = await models.students.findAll({
            where: {
                email: {
                    [Op.in]: body.students
                }
            }
        });
    }else {
        students = await models.students.findAll({
            where: {
                email: body.students
            }
        })
    }
    if(!teacher) {
        executeResponse.send({
            "message": "No Teacher found for given email"
        });
    }else if(!students.length) {
        executeResponse.send({
            "message": "No Student found for given email"
        })
    }else {
        const studentsMap = await students.map(student => {
            return {
                studentId: student.get('id'),
                teacherId: teacher.get('id')
            }
        })
        models.register
              .bulkCreate(studentsMap)
              .then(() => {
                executeResponse.send({
                    "message": "Successfully registered"
                });
              })
    }
    
}


module.exports = { RegisterStudent };