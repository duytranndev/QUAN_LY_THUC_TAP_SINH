const { getHomePage } = require("../models/course");

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
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course =>{
                res.json(course)
            })
            .catch(next)
    }
    
    index(req, res, next){
        getHomePage(req,res,next);
    }
    
}
module.exports = new CourseController();
