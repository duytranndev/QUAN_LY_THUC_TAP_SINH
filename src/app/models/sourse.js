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
    slug = slug.replace(/ /gi, '-');
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
function ChangToID(id) {
    id = id.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    id = id.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    id = id.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    id = id.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    id = id.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    id = id.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    id = id.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    id = id.replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        '',
    );
    //Xoa khoang trang
    id = id.replace(/ /gi, '');
    //Xóa các khoang trang ở đầu và cuối
    id = '@' + id + '@';
    id = id.replace(/\@\ |\ \@|\@/gi, '');

    return id;
}

module.exports = {
    getCourse: (callBack) => {
        db.query(`select * from  `, [], (error, results, fiedls) => {
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
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    getCourseByID: (id, callBack) => {
        db.query(
            `select * from course where id_course=?`,
            [id],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    getCourseById_enter: (id, callBack) => {
        db.query(
            `select * from course where id_enterprise=?`,
            [id],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    getAllInstructor: (id, callBack) => {
        db.query(
            `select * from instructor where id_enterprise=?`,
            [id],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    createCourse: (id, data, callBack) => {
        let currentdate = new Date();
        let datetime =
            currentdate.getDate() +
            '/' +
            (currentdate.getMonth() + 1) +
            '/' +
            currentdate.getFullYear();
        let slug = ChangeToSlug(data.name_course + data.title);

        db.query(
            `insert into course (name_course, id_enterprise, slug, time_create, content ,time_train, title, address, time_end, id_instructor ) values(?,?,?,?,?,?,?,?,?,?)`,
            [
                data.name_course,
                data.id_enterprise,
                slug,
                datetime,
                data.content,
                data.time_train,
                title,
                address,
                time_end,
                data.id_instructor,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    updateCourse: (data, id, callBack) => {
        let slug = ChangeToSlug(id + ' ' + data.name_course);

        db.query(
            `update course set name_course=?, time_course=?, slug=?, id_enterprise=? where id_course=?`,
            [
                data.name_course,
                data.time_course,
                slug,
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
    deleteCourse: (id_course, callBack) => {
        db.query(
            `delete from course where id_course=?`,
            [id_course],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
};
