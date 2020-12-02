const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Course = new Schema({
    name:{type:String, required:true, maxlength: 255},
    description:{type:String, maxlength: 600},
    image:{type:String, maxlength: 255},
    slug: { type: String, slug: 'name', unique:true }//unique: chỉ tồn tại duy nhất
},{
    timestamps:true
});


module.exports = mongoose.model('Course', Course);
