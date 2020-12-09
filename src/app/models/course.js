//const connect = require('../../config/db')

const { uniqueId, result } = require("lodash");
const { error } = require("npmlog");
const db = require("../../config/db/database");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const fs = require("fs");
const { model } = require("mongoose");

//

function ChangeToSlug(slug) {
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
  createCourse: (data, file, callBack) => {
    let s_name = data.name;
    let description = data.description;
    let slug = ChangeToSlug(s_name + " hi");
    
    db.query(
      `insert into course (name, description, image, slug) values(?,?,?,?)`,
      [s_name, description, image_name, slug],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCourse: (callBack) => {
    db.query(`select * from course`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getCourseBySlug: (slug, callBack) => {
    db.query(
      `select * from course where slug=?`,
      [slug],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getCourseById: (id, callBack) => {
    db.query(
      `select * from course where name=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  updateCourse: (data, callBack) => {
    db.query(
      `update course set description=?, image=?, slug=? where name=?`,
      [data.description, data.image, data.slug, data.name],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
