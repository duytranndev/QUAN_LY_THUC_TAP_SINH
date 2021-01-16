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
    getEnterprise: (callBack) => {
        db.query(`select * from enterprise`, [], (error, results, fiedls) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    getEnterpriseBySlug: (slug, callBack) => {
        db.query(
            `select * from enterprise where slug=?`,
            [slug],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    getEnterpriseByID: (id, callBack) => {
        db.query(
            `select * from enterprise where id_enterprise=?`,
            [id],
            (error, results, fiedls) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            },
        );
    },

    createEnterprise: (data, file, callBack) => {
        let id_enterprise = ChangToID(
            data.nickname_enterprise +
                '_' +
                data.name_enterprise.split(' ').slice(-1),
        );
        let slug = ChangeToSlug(id_enterprise + ' ' + data.name_enterprise);
        let image_name;
        if (file) {
            let uploadedFile = file.image_enterprise;
            image_name = uploadedFile.name;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            image_name = id_enterprise + '.' + fileExtension;

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
            `insert into enterprise (id_enterprise, nickname_enterprise,name_enterprise, address_enterprise, describe_enterprise, image_enterprise, contact, slug) values(?,?,?,?,?,?,?,?)`,
            [
                id_enterprise,
                data.nickname_enterprise,
                data.name_enterprise,
                data.address_enterprise,
                data.describe_enterprise,
                image_name,
                data.contact,
                slug,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            },
        );
    },
    updateEnterprise: (data, file, id, callBack) => {
        let slug = ChangeToSlug(id + ' ' + data.name_enterprise);
        let image_name;
        if (file) {
            let uploadedFile = file.image;
            image_name = uploadedFile.name;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            image_name = id + '.' + fileExtension;

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
            `update enterprise set nickname_enterprise=?, name_enterprise=?, address_enterprise=?, contact=?, describe_enterprise=?, slug=? where id_enterprise=?`,
            [
                data.nickname_enterprise,
                data.name_enterprise,
                data.address_enterprise,
                data.contact,
                data.describe_enterprise,
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
    deleteEnterprise: (id_enterprise, callBack) => {
        db.query(
            `delete from enterprise where id_enterprise=?`,
            [id_enterprise],
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

const Enterprise = new Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        dia_chi: { type: String, maxlength: 255 },
        mo_ta: { type: String, maxlength: 255 },
        image: { type: String, maxlength: 255 },
        lien_he: { type: String, maxlength: 255 },
        ngay_thanh_lap: { type: String, maxlength: 255 },
        giam_doc: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Enterprise', Enterprise);
