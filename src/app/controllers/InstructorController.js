//Import
const {
  deleteEnterprise,
  getEnterpriseBySlug,
  createEnterprise,
} = require("../models/enterprise");
const { genSaltSync, hashSync } = require("bcrypt");
const { result } = require("lodash");
const { error } = require("npmlog");
const { createInstructor, getInstructorByID,getInstructorById_enter ,updateInstructor, deleteInstructor, getInstructorBySlug} = require("../models/instructor");

class PostController {
  //[GET] enterprises/create
  create(req, res) {
    //get dữ liệu của mấy thằng khác xong rồi đổ vào drop
    res.render("instructors/create_instructor");
  }
  //[POST] enterprises/create data => enterprises/store => render enterprises/stored
  store(req, res) {
    const id = req.params.id_enterprise;
    const body = req.body;
    const file = req.files;
    const salt = genSaltSync(10);
    createInstructor(id, body, file, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      res.redirect("stored");
    });

    // var test = req.files.image_student;
    // res.json(test.name);
  }

  stored(req, res) {
    const id = req.params.id_enterprise;
    getInstructorById_enter(id,(error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.render("instructors/stored_instructor", {
        instructors: results,
      });
    });
  }
  //[GET] /students/:slug
  show(req, res) {
    const slug = req.params.slug;
    getInstructorBySlug(slug, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("instructors/show_instructor", {
        instructors: results,
      });
      // return res.render('courses/show',{
      //     data:results
      // })
    });
  }
  //[GET] /enterprises
  index(req, res) {
    const id = req.params.id_enterprise;
    getInstructorById_enter(id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("instructor", {
        instructors: results,
      });
    });
  }

  edit(req, res) {
    const id = req.params.id_instructor;
    getInstructorByID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("instructors/edit_instructor", {
        instructors: results,
      });
    });
  }

  //[PUT] /enterprises/:id_enterprise
  update(req, res) {
    const data = req.body;
    const file = req.files;
    const id = req.params.id_instructor;
    updateInstructor(data, file, id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.redirect("stored");
    });
  }
  //[DELETE] /enterprises/:id_enterprise
  delete(req, res, next) {
    const id_instructor = req.params.id_instructor;
    deleteInstructor(id_instructor, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.redirect("back");
    });
  }
}

module.exports = new PostController();
