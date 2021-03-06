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
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|/gi,
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
    getPost: (callBack) => {
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
            },
        );
    },
    getPostById_enter: (id, callBack) => {
        db.query(
            `select * from post where id_enterprise=?`,
            [id],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
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
            },
        );
    },

    createPost: (id, data, file, callBack) => {
        let id_post = ChangToID(id + '_' + data.title_post);
        let slug = ChangeToSlug(id_post + ' ' + data.title_post);
        let image_name;
        if (file) {
            let uploadedFile = file.image_post;
            image_name = uploadedFile.name;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            image_name = id_post + '.' + fileExtension;

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
            `insert into post (id_post, title_post, detail_post, time_create, image_post, slug, id_enterprise) values(?,?,?,?,?,?,?)`,
            [
                id_post,
                data.title_post,
                data.detail_post,
                data.time_create,
                image_name,
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
    updatePost: (data, file, id, callBack) => {
        let slug = ChangeToSlug(id + ' ' + data.title_post);
        let image_name;

        db.query(
            `update post set title_post=?, detail_post=?, time_create=?,  slug=? where id_post=?`,
            [data.title_post, data.detail_post, data.time_create, slug, id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    deletePost: (data, callBack) => {
        db.query(
            `delete from post where id_post=?`,
            [data],
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

const Post = new Schema(
    {
        tieu_de: { type: String, required: true },
        mo_ta: { type: String, maxlength: 255 },
        noi_dung: { type: String, maxlength: 255 },
        hinh_anh: { type: String, maxlength: 255 },
        id_enterprise: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'tieu_de', unique: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Post', Post);
