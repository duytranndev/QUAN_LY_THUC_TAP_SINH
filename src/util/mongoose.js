const { mongo } = require("mongoose")

//Công cụ, viết ra những logic dạng công cụ. File này xử lý Data của thằng Mongoose
module.exports = {
    //Xử lý data dạng Array trước
    mutipleMongooseToObject:function(mongoose){
        return mongoose.map(mongoose =>mongoose.toObject());
    },
    mongooseToObject:function(mongoose){
        return mongoose ? mongoose.toObject():mongoose;
    }
}
