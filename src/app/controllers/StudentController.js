//Import
const {
  getStudent,
  getStudentBySlug,
  createStudent,
} = require("../models/student");
const { genSaltSync, hashSync } = require("bcrypt");
const { result } = require("lodash");
const { error } = require("npmlog");

class StudentController {

    //[GET] students/create
  create(req, res) {
    res.render("students/create_student");
  }
  //[POST] students/store =>render students/stored
  store(req, res) {
    const file = req.files;
    const body = req.body;
    //const salt = genSaltSync(10);
    createStudent(body, file, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        students: results,
      });
    });
    res.redirect("/stored");
  }
  //[GET] /students/:slug
  show(req, res) {
    const slug = req.params.slug;
    getStudentBySlug(slug, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("students/show_student", {
        students: results,
      });
      // return res.render('courses/show',{
      //     data:results
      // })
    });
  }
  //[GET] /students
  index(req, res) {
    getStudent((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("student", {
        students: results,
      });
    });
  }
  stored(req, res) {
    getStudent((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.render("students/stored_student", {
        data: results,
      });
    });
  }
}

module.exports = new StudentController();
