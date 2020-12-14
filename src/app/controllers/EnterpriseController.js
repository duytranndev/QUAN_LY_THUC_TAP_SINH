//Import
const {
    getEnterprise,
    updateEnterprise,
    getEnterpriseByID,
    createEnterprise,
    deleteEnterprise
  } = require("../models/enterprise");
  const { genSaltSync, hashSync } = require("bcrypt");
  const { result } = require("lodash");
  const { error } = require("npmlog");
  
  
  
  class EnterpriseController {
  
      //[GET] enterprises/create
      create(req, res) {
      //get dữ liệu của mấy thằng khác xong rồi đổ vào drop
      res.render("enterprises/create_enterprise");
    }
    //[POST] enterprises/create data => enterprises/store => render enterprises/stored
    store(req, res) {
      
      const body = req.body;
      const file = req.files
      const salt = genSaltSync(10);
      createEnterprise(body, file, (error, results) => {
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
      getEnterprise((error, results) => {
        if (error) {
          console.log(error);
          return;
        }
        return res.render("enterprises/stored_enterprise", {
          enterprises: results,
        });
      });
    }
    //[GET] /students/:slug
    // show(req, res) {
    //   const slug = req.params.slug;
    //   getStudentBySlug(slug, (err, results) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     }
    //     return res.render("students/show_student", {
    //       students: results,
    //     });
    //     // return res.render('courses/show',{
    //     //     data:results
    //     // })
    //   });
    // }
    //[GET] /enterprises
    index(req, res) {
      getEnterprise((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.render("enterprise", {
          enterprises: results,
        });
      });
    }
  
    edit(req, res){
      const id = req.params.id_enterprise;
      getEnterpriseByID(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.render("enterprises/edit_enterprise", {
          enterprises: results,
        });
        // return res.render('courses/show',{
        //     data:results
        // })
      });
    }
  
    //[PUT] /enterprises/:id_enterprise
    update(req, res){
      const data = req.body;
      const file = req.files;
      const id = req.params.id_enterprise;
      updateEnterprise(data,file,id, (err, results) => {
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
  //[DELETE] /enterprises/:id_enterprise
    delete(req, res, next){
      const id_enterprise = req.params.id_enterprise;
      deleteEnterprise(id_enterprise, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.redirect('back')
        
      });
    }
    
  }
  
  module.exports = new EnterpriseController();
  