const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Student = new Schema({
    name:{type:String, required:true, maxlength: 255},
    age:{type:String, maxlength: 600},
    detail:{type:String, maxlength: 255}
},{
    timestamps:true
});


module.exports = mongoose.model('Student', Student);
