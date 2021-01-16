const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Student = new Schema(
    {
        name: { type: String, required: true },
        mo_ta: { type: String, maxlength: 255 },
        ngay_sinh: { type: String, maxlength: 255 },
        lop: { type: String, maxlength: 255 },
        gioi_tinh: { type: String, maxlength: 255 },
        mssv: { type: String, maxlength: 255 },
        lien_he: { type: String, maxlength: 255 },
        email: { type: String, maxlength: 255 },
        image: { type: String, maxlength: 255 },
        idKhoa: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Student', Student);
