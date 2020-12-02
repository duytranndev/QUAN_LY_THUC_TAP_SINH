//Import
const Student = require('../models/student');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class StudentController {
    show(req, res, next) {
        Student.findOne({ name: req.params.name })
            .then(students =>{
                res.render('students/show_student',{
                    students: mongooseToObject(students)
                })
            })
            .catch(next)
    }
    index(req, res, next) {
        Student.find({})
            .then(students => {
                res.render('student',{
                    students:mutipleMongooseToObject(students)
                });
            })
            .catch(next);
        //res.render('home');
    }
}

module.exports = new StudentController();
