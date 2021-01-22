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
    id = id.replace(/ /gi, ' - ');
    //Xóa các khoang trang ở đầu và cuối
    id = '@' + id + '@';
    id = id.replace(/\@\ |\ \@|\@/gi, '');

    return id;
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
    getAllInstructor: (callBack) => {
        db.query(
            `select level, name_instructor, id_instructor,enterprise.id_enterprise,  name, instructor.slug, instructor.image, instructor.contact 
        from instructor 
        inner join enterprise 
        on instructor.id_enterprise = enterprise.id_enterprise`,
            [],
            (error, results, fiedls) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    getInstructorBySlug: (slug, callBack) => {
        db.query(
            `SELECT name_instructor, birthday, describe_instructor, enterprise.name, instructor.contact, level , image FROM instructor
      inner join enterprise
      on instructor.id_enterprise = enterprise.id_enterprise
      where instructor.slug =?`,
            [slug],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
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
            },
        );
    },
    getInstructorById_enter: (id, callBack) => {
        db.query(
            `select level, name_instructor, id_instructor, enterprise.id_enterprise, name, instructor.contact from instructor inner join enterprise on instructor.id_enterprise = enterprise.id_enterprise where instructor.id_enterprise=?`,
            [id],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    createInstructor: (id, data, file, callBack) => {
        let slug = ChangeToSlug(data.name_instructor + data.id_enterprise);
        let image_name;
        if (file) {
            let uploadedFile = file.image_instructor;
            image_name = uploadedFile.name;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            image_name =
                ChangeToSlug(data.name_instructor) + '.' + fileExtension;

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
            `insert into instructor ( name_instructor, birthday, describe_instructor, level, image, contact, slug, id_enterprise) values(?,?,?,?,?,?,?,?)`,
            [
                data.name_instructor,
                data.birthday,
                data.describe_instructor,
                data.level,
                image_name,
                data.contact,
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
    updateInstructor: (data, file, id, callBack) => {
        let slug = ChangeToSlug(id.substr(-4) + ' ' + data.name_instructor);

        db.query(
            `update instructor set name_instructor=?, birthday=?, describe_instructor=?, contact=?, slug=? where id_instructor=?`,
            [
                data.name_instructor,
                data.birthday_instructor,
                data.describe_instructor,
                data.contact,
                slug,
                id,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    deleteInstructor: (id_instructor, callBack) => {
        db.query(
            `delete from instructor where id_instructor=?`,
            [id_instructor],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
};
