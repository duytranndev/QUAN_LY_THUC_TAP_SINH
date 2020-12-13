const { result } = require("lodash");
const { error } = require("npmlog");
const db = require("../../config/db/database");


function ChangeToSlug(slug){
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, " - ");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");

  return slug;
}




module.exports = {
  getpost: (callBack) => {
    db.query(`select * from post`, [], (error, results, fiedls) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getPostBySlug: (slug, callBack) => {
    db.query(
      `select * from post where slug=?`,
      [slug],
      (error, results, fiedls) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPostByID: (id, callBack) => {
    db.query(
      `select * from post where id_post=?`,
      [id],
      (error, results, fiedls) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  createPost: (data, file, callBack) => {
    
    let slug = ChangeToSlug(data.id_post + " " + data.title_post);
    let image_name;
    if (file) {
      let uploadedFile = file.image;
      image_name = uploadedFile.name;
      let fileExtension = uploadedFile.mimetype.split("/")[1];
      image_name = s_name + "." + fileExtension;

      if (
        uploadedFile.mimetype === "image/png" ||
        uploadedFile.mimetype === "image/jpeg" ||
        uploadedFile.mimetype === "image/gif"
      ) {
        // upload the file to the /public/assets/img directory
        uploadedFile.mv(`src/public/assets/img/${image_name}`, (err) => {
          if (err) {
            return;
          }
        });
      }
    }
    db.query(
      `insert into post (id_post, title_post, detail_post, time_create, image_post, id_enterprise, slug) values(?,?,?,?,?,?,?)`,
      [
        data.id_post,
        data.title_post,
        data.detail_post,
        data.time_create,
        image_name,
        data.id_enterprise,
        slug
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updatePost: (data, file, callBack) => {
    let slug = ChangeToSlug(data.id_post + " " + data.title_post);
    let image_name;
    if (file) {
      let uploadedFile = file.image;
      image_name = uploadedFile.name;
      let fileExtension = uploadedFile.mimetype.split("/")[1];
      image_name = s_name + "." + fileExtension;

      if (
        uploadedFile.mimetype === "image/png" ||
        uploadedFile.mimetype === "image/jpeg" ||
        uploadedFile.mimetype === "image/gif"
      ) {
        // upload the file to the /public/assets/img directory
        uploadedFile.mv(`src/public/assets/img/${image_name}`, (err) => {
          if (err) {
            return;
          }
        });
      }
    }
    db.query(
      `update post set title_post=?, detail_post=?, time_create=?, image_post=?, id_enterprise=?, slug=? where id_post=?`,
      [
        data.title_post,
        data.detail_post,
        data.time_create,
        image_name,
        data.id_enterprise,
        slug,
        data.id_post
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deletePost: (data, callBack) => {
    db.query(
      `delete from post where id_post=?`,
      [data.id_post],
      (error, results, fiedls) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
