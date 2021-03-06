const { result } = require('lodash');
const { error } = require('npmlog');
const db = require('../../config/db/database');

function ChangeToSlug(slug) {
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        '',
    );
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, ' - ');
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}

module.exports = {
    getStudent_internship: (callBack) => {
        db.query(
            `select * from student_internship`,
            [],
            (error, results, fiedls) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    getStudent_internshipBySlug: (slug, callBack) => {
        db.query(
            `select * from student_internship where slug=?`,
            [slug],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    getStudent_internshipByID: (id, callBack) => {
        db.query(
            `select * from student_internship where id_course=?`,
            [id],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },

    createstudent_internship: (data, file, callBack) => {
        let slug = ChangeToSlug(data.id_course + ' ' + data.name_course);
        let image_name;
        if (file) {
            let uploadedFile = file.image;
            image_name = uploadedFile.name;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            image_name = s_name + '.' + fileExtension;

            if (
                uploadedFile.mimetype === 'image/png' ||
                uploadedFile.mimetype === 'image/jpeg' ||
                uploadedFile.mimetype === 'image/gif'
            ) {
                // upload the file to the /public/assets/img directory
                uploadedFile.mv(
                    `src/public/assets/img/${image_name}`,
                    (err) => {
                        if (err) {
                            return;
                        }
                    },
                );
            }
        }
        db.query(
            `insert into student_internship (id_course, name_course, time_course, slug, id_enterprise) values(?,?,?,?,?)`,
            [
                data.id_course,
                data.name_course,
                data.time_course,
                slug,
                data.id_enterprise,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    updatestudent_internship: (data, file, id, callBack) => {
        let slug = ChangeToSlug(data.id_course + ' ' + data.name_course);
        let image_name;
        if (file) {
            let uploadedFile = file.image;
            image_name = uploadedFile.name;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            image_name = s_name + '.' + fileExtension;

            if (
                uploadedFile.mimetype === 'image/png' ||
                uploadedFile.mimetype === 'image/jpeg' ||
                uploadedFile.mimetype === 'image/gif'
            ) {
                // upload the file to the /public/assets/img directory
                uploadedFile.mv(
                    `src/public/assets/img/${image_name}`,
                    (err) => {
                        if (err) {
                            return;
                        }
                    },
                );
            }
        }
        db.query(
            `update student_internship set name_course=?, time_course=?, slug=?, id_enterprise=? where id_course=?`,
            [
                data.name_course,
                data.time_course,
                data.slug,
                data.id_enterprise,
                data.id_course,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    deletestudent_internship: (data, callBack) => {
        db.query(
            `delete from student_internship where id_course=?`,
            [data.id_course],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const ManageIntern = new Schema(
    {
        id_student: { type: String, maxlength: 255 },
        id_courseIntern: { type: String, maxlength: 255 },
        ngaykt_dukien: { type: String, maxlength: 255 },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('ManageIntern', ManageIntern);
