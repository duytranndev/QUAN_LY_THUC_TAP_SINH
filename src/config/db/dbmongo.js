const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://duydev:duy123@cluster0.yoqrz.mongodb.net/quan_ly_thuc_tap',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('connect success');
    } catch (error) {
        console.log('connect failue');
    }
}

module.exports = { connect };
