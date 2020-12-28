
const homeController = require("./home");
const studentRouter = require("./students");
const adminRouter = require("./admins");
const enterpriseController = require("./enterprises");

function route(app) {

  app.use("/enterprises",enterpriseController);
  app.use("/admin",adminRouter);
  app.use("/students",studentRouter);
  app.use("/",homeController);
  
}

module.exports = route;
