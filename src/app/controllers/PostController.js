//Import
const {
  deleteEnterprise,
  getEnterpriseBySlug,
} = require("../models/enterprise");
const { genSaltSync, hashSync } = require("bcrypt");
const { result } = require("lodash");
const { error } = require("npmlog");
const { createPost, getPost, getPostByID,getPostById_enter ,updatePost, deletePost, getPostBySlug} = require("../models/post");

class PostController {
  //[GET] enterprises/create
  create(req, res) {
    //get dữ liệu của mấy thằng khác xong rồi đổ vào drop
    res.render("posts/create_post");
  }
  //[POST] enterprises/create data => enterprises/store => render enterprises/stored
  store(req, res) {
    const id = req.params.id_enterprise;
    const body = req.body;
    const file = req.files;
    const salt = genSaltSync(10);
    createPost(id, body, file, (error, results) => {
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
    getPostById_enter(id,(error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.render("posts/stored_post", {
        posts: results,
      });
    });
  }
  //[GET] /students/:slug
  show(req, res) {
    const slug = req.params.slug;
    getPostBySlug(slug, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("posts/show_post", {
        posts: results,
      });
      // return res.render('courses/show',{
      //     data:results
      // })
    });
  }
  //[GET] /enterprises
  index(req, res) {
    const id = req.params.id_enterprise;
    getPostById_enter(id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("post", {
        posts: results,
      });
    });
  }

  edit(req, res) {
    const id = req.params.id_post;
    getPostByID(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.render("posts/edit_post", {
        posts: results,
      });
    });
  }

  //[PUT] /enterprises/:id_enterprise
  update(req, res) {
    const data = req.body;
    const file = req.files;
    const id = req.params.id_post;
    updatePost(data, file, id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.redirect("stored");
    });
  }
  //[DELETE] /enterprises/:id_enterprise
  delete(req, res, next) {
    const id_post = req.params.id_post;
    deletePost(id_post, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.redirect("back");
    });
  }
}

module.exports = new PostController();
