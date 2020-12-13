//Import
const {
  getStudent,
  getStudentBySlug,
  createStudent,
  getStudentByID,
  updateStudent,
  deleteStudent
} = require("../models/student");
const { genSaltSync, hashSync } = require("bcrypt");
const { result } = require("lodash");
const { error } = require("npmlog");



class StudentController {

    //[GET] students/create
  create(req, res) {
    //get dữ liệu của mấy thằng khác xong rồi đổ vào drop
    res.render("students/create_student");
  }
  //[POST] students/create data => students/store => render students/stored
  store(req, res) {

    
    const body = req.body;
    const file = req.files
    const salt = genSaltSync(10);
    createStudent(body, file, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      res.redirect('stored');
    });
    
    // var test = req.files.image_student;
    // res.json(test.name);
  }

  stored(req, res) {
    getStudent((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.render("students/stored_student", {
        students: results,
      });
    });
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

  edit(req, res){
    const id = req.params.id_student;
    getStudentByID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("students/edit_student", {
        students: results,
      });
      // return res.render('courses/show',{
      //     data:results
      // })
    });
  }

  //[PUT] /students/:id_student
  update(req, res){
    const data = req.body;
    const file = req.files;
    updateStudent(data,file, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.redirect('stored')
      // return res.render('courses/show',{
      //     data:results
      // })
    });

    
  }
//[DELETE] /students/:id_student
  delete(req, res, next){
    const id_student = req.params.id_student;
    deleteStudent(id_student, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.redirect('back')
      
    });
  }
  
}

module.exports = new StudentController();
