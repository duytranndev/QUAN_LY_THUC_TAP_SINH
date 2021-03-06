//Import
const {
  deleteEnterprise,
  getEnterpriseBySlug,
} = require("../models/enterprise");
const { genSaltSync, hashSync } = require("bcrypt");
const { result } = require("lodash");
const { error } = require("npmlog");
const { createCourse, getAllInstructor,getCourse, getCourseByID,getCourseBySlug ,updateCourse, deleteCourse, getCourseById_enter} = require("../models/sourse");
const { json } = require("body-parser");

class CourseController {
  //[GET] enterprises/create
  create(req, res) {
    //get dữ liệu của mấy thằng khác xong rồi đổ vào drop
    const id = req.params.id_enterprise;
    getAllInstructor(id , (error, result)=>{
      if(error){
        console.log(error);
        return  res.status(500).json({
          success:0,
          message:"database connection error"
        });
      }
      res.render("courses/create_course",{
        instructors :result
      })
    });

  }
  //[POST] enterprises/create data => enterprises/store => render enterprises/stored
  store(req, res) {
    const id = req.params.id_enterprise;
    const body = req.body;
    const salt = genSaltSync(10);
    // createCourse(id, body, (error, results) => {
    //   if (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //       success: 0,
    //       message: "Database connection error",
    //     });
    //   }
    //   res.redirect("stored");
    // });
    res.json(req.body)
    // var test = req.files.image_student;
    // res.json(test.name);
  }

  stored(req, res) {
    const id = req.params.id_enterprise;
    getCourseById_enter(id,(error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.render("courses/stored_course", {
        courses: results,
      });
    });
  }
  //[GET] /students/:slug
  show(req, res) {
    const slug = req.params.slug;
    getCourseBySlug(slug, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("courses/show_course", {
        courses: results,
      });
      // return res.render('courses/show',{
      //     data:results
      // })
    });
  }
  //[GET] /enterprises
  index(req, res) {
    const id = req.params.id_enterprise;
    getCourseById_enter(id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("course", {
        courses: results,
      });
    });
  }

  edit(req, res) {
    const id = req.params.id_course;
    getCourseByID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("courses/edit_course", {
        courses: results,
      });
    });
  }

  //[PUT] /enterprises/:id_enterprise
  update(req, res) {
    const data = req.body;
    const id = req.params.id_course;
    updateCourse(data, id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.redirect("stored");
    });
  }
  //[DELETE] /enterprises/:id_enterprise
  delete(req, res, next) {
    const id_course = req.params.id_course;
    deleteCourse(id_course, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.redirect("back");
    });
  }
}

module.exports = new CourseController();
