const {
  createCourse,
  getCourse,
  getCourseBySlug,
  getCourseById,
  updateCourse,
} = require("../models/course");
const { genSaltSync, hashSync } = require("bcrypt");
const { result } = require("lodash");



class CourseController {

  //[GET] /courses/create
  create(req, res) {
    res.render("courses/create_course");
  }

  //[POST] /crouses
  store(req, res){
    // const body = req.body;
    // const file = req.files;
    // createCourse(body, file, (error, results) => {
    //   if (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //       success: 0,
    //       message: "Database connection error",
    //     });
    //   }
    //   res.redirect('/stored');
    // });
    var test = req.files.image;
    res.json(test.name);
  }
  stored(req, res){
    getCourse((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("courses/stored_course", {
        data: results,
      });
    });
  }

  //[GET] /courses/:name/edit
  edit(req, res){
    const id_student = req.params.id_student;
    getCourseById(id_student, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("courses/edit_course", {
        data: results,
      });
  
    });
    
  }

  //[PUT] /courses/:name
  update(req, res){
    const data = req.body;
    updateCourse(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.redirect('/stored')
      // return res.render('courses/show',{
      //     data:results
      // })
    });
  }

  //[GET] /courses
  index(req, res) {
    getCourse((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("home", {
        data: results,
      });
    });
  }
  
  show(req, res) {
    const slug = req.params.slug;
    getCourseBySlug(slug, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("courses/show", {
        data: results,
      });
      // return res.render('courses/show',{
      //     data:results
      // })
    });
  }
}
module.exports = new CourseController();
