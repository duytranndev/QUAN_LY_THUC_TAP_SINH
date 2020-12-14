
const homeController = require("./home");
const studentRouter = require("./students");
const adminRouter = require("./admins");
const enterpriseController = require("./enterprises");

function route(app) {

  app.use("/enterprises",enterpriseController);
  app.use("/admin",adminRouter);
  app.use("/students",studentRouter);
  app.use("/",homeController);
  //localhost /students => studentRouter
  //app.get("/add", addPlayerPage);
  //app.get("/edit/:id", editPlayerPage);
  //app.get("/delete/:id", deletePlayer);
  //app.post("/add", addPlayer);
  //app.post("/edit/:id", editPlayer);
  
}

module.exports = route;
