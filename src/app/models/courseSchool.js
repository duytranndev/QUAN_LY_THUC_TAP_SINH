const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const CourseStudent = new Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        year_start: { type: String, maxlength: 255 },
        year_end: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('CourseStudent', CourseStudent);
