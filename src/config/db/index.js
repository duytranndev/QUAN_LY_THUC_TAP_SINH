const mongoose = require("mongoose");
// Using ES6 imports

async function connect() {
  try {
        await mongoose.connect("mongodb://localhost:27017/quan_ly_thuc_tap_dev", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
        console.log("connect successfully!!!");
  } catch (error) {
        console.log("connect failure!!!");
  }
}

module.exports = { connect };
