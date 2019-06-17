const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const notifications = require("express").Router();
const models = require('../../../db/models');
const TEACHER = 'teacher';
const NOTIFICATION = 'notification';


const getEmailsFromStr = (str) => {
    return str.split(' ').filter(e => e.charAt(0) === '@').map(e => e.substr(1))
}

notifications.post("/retrievefornotifications",async (req, res, next) => {
    const { body } = req;
    const reqParams = Object.keys(body);
    try {
        if(!reqParams.includes(NOTIFICATION) || !reqParams.includes(TEACHER)) {
            res.status(400).send({
                "message": "Invalid parameters are passed"
            })
        }else if(typeof body[NOTIFICATION] !== 'string' && typeof body[TEACHER] !== 'string') {
            res.status(400).send({
                "message": "Request Input data types are not valid"
            })
        }else {
            const teacher = await models.teachers.findOne({
                where: {
                    email: body[TEACHER]
                }
            });
            const registers = await models.register.findAll({
                where: {
                    teacherId: teacher.get('id')
                }
            });
            const students = await models.students.findAll({
                where: {
                    id: {
                        [Op.in]: registers.map(register => register.get('studentId'))
                    },
                    suspended: false
                }
            });

            const studentsFromNotification = await models.students.findAll({
                where: {
                    email: {
                        [Op.in]: getEmailsFromStr(body[NOTIFICATION])
                    },
                    suspended: false
                }
            });

            res.status(200).json({
                recipients: [
                    ...[...students, ...studentsFromNotification].map(student => student.get('email'))
                ]
            })
        }
    } catch (e) {
        res.status(400).send({
            "message": "Notification Failed"
        });
    }
});

module.exports = notifications;