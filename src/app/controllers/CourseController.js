//Import
const Course = require('../models/course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course =>{
                res.render('courses/show',{
                    course: mongooseToObject(course)
                })
            })
            .catch(next)
    }
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home',{
                    courses:mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
        //res.render('home');
    }
}

module.exports = new CourseController();
