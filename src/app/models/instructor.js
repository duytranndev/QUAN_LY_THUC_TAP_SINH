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
  getInstructor: (callBack) => {
    db.query(`select * from instructor`, [], (error, results, fiedls) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getInstructorBySlug: (slug, callBack) => {
    db.query(
      `select * from instructor where slug=?`,
      [slug],
      (error, results, fiedls) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getInstructorByID: (id, callBack) => {
    db.query(
      `select * from instructor where id_instructor=?`,
      [id],
      (error, results, fiedls) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  createInstructor: (data, file, callBack) => {
    
    let slug = ChangeToSlug(data.id_instructor + " " + data.name_instructor);
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
      `insert into instructor (id_instructor, name_instructor, birthday_instructor, describe_instructor, image_instructor, slug, id_enterprise) values(?,?,?,?,?,?,?)`,
      [
        data.id_instructor,
        data.name_instructor,
        data.birthday_instructor,
        data.describe_instructor,
        image_name,
        slug,
        data.id_enterprise
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateInstructor: (data, file, id, callBack) => {
    let slug = ChangeToSlug(data.id_instructor + " " + data.name_instructor);
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
      `update instructor set name_instructor=?, birthday_instructor=?, describe_instructor=?, image_instructor=?, slug=?, id_enterprise=? where id_instructor=?`,
      [
        data.name_instructor,
        data.birthday_instructor,
        data.describe_instructor,
        image_name,
        slug,
        data.id_enterprise,
        data.id_instructor
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteInstructor: (data, callBack) => {
    db.query(
      `delete from instructor where id_instructor=?`,
      [data.id_instructor],
      (error, results, fiedls) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
