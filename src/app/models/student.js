
const db = require("../../config/db/database");
const { genSaltSync, hashSync } = require("bcrypt");
const { result } = require("lodash");
const { error } = require("npmlog");

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


function ChangToID(id){
  id = id.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  id = id.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  id = id.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  id = id.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  id = id.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  id = id.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  id = id.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  id = id.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Xoa khoang trang
  id = id.replace(/ /gi, "");
  //Xóa các khoang trang ở đầu và cuối
  id = "@" + id + "@";
  id = id.replace(/\@\ |\ \@|\@/gi, "");

  return id;
}



module.exports = {
  getStudent: (callBack) => {
    db.query(`select * from student`, [], (error, results, fiedls) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getStudentBySlug: (slug, callBack) => {
    db.query(
      `select * from student where slug=?`,
      [slug],
      (error, results, fiedls) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getStudentByID: (id, callBack) => {
    db.query(
      `select * from student where id_student=?`,
      [id],
      (error, results, fiedls) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  createStudent: (data, file, callBack) => {

    let id_student = ChangToID(data.name_student + data.mssv_student.substr(-4));
    let slug = ChangeToSlug(data.name_student + " " + data.mssv_student.substr(-4));
    


    let image_name;

    if (file) {
      
      let uploadedFile = file.image_student;
      image_name = uploadedFile.name;
      let fileExtension = uploadedFile.mimetype.split("/")[1];
      image_name =id_student + "." + fileExtension;

      if (
        uploadedFile.mimetype === "image/png" ||
        uploadedFile.mimetype === "image/jpeg" ||
        uploadedFile.mimetype === "image/gif" ||
        uploadedFile.mimetype === "image/jpg" ||
        uploadedFile.mimetype === "image/raw"
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
      `insert into student (id_student, mssv_student, name_student, birthday_student, gender_student, class_student, describe_student, image_student, slug) values(?,?,?,?,?,?,?,?,?)`,
      [
        id_student,
        data.mssv_student,
        data.name_student,
        data.birthday_student,
        data.gender_student,
        data.class_student,
        data.describe_student,
        image_name,
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
  updateStudent: (data, file, id, callBack) => {
    let mssv_student = data.mssv_student;
    let msv = mssv_student.substr(-4);
    let slug = ChangeToSlug(data.name_student+" "+msv);
    let image_name;

    if (file) {
      
      let uploadedFile = file.image_student;
      image_name = uploadedFile.name;
      let fileExtension = uploadedFile.mimetype.split("/")[1];
      image_name =id + "." + fileExtension;

      if (
        uploadedFile.mimetype === "image/png" ||
        uploadedFile.mimetype === "image/jpeg" ||
        uploadedFile.mimetype === "image/gif" ||
        uploadedFile.mimetype === "image/jpg" ||
        uploadedFile.mimetype === "image/raw"
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
      `update student set mssv_student=?, name_student=?, birthday_student=?, gender_student=?, class_student=?, describe_student=?, slug=? where id_student=?`,
      [
        mssv_student,
        data.name_student,
        data.birthday_student,
        data.gender_student,
        data.class_student,
        data.describe_student,
        slug,
        id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteStudent: (id_student, callBack) => {
    db.query(
      `delete from student where id_student=?`,
      [id_student],
      (error, results, fiedls) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
