const newsRouter = require("./news");
const coursesRouter = require("./courses");
const homeController = require("./home");
const studentRouter = require("./students");
const adminRouter = require("./admins");

function route(app) {
  app.get("/admin",adminRouter);
  app.use("/courses",coursesRouter);
  app.use("/students",studentRouter)
  app.use("/",coursesRouter);
  //app.get("/add", addPlayerPage);
  //app.get("/edit/:id", editPlayerPage);
  //app.get("/delete/:id", deletePlayer);
  //app.post("/add", addPlayer);
  //app.post("/edit/:id", editPlayer);
  
}

module.exports = route;
