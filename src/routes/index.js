const newsRouter = require("./news");
const coursesRouter = require("./courses");
const siteRouter = require("./site");
const studentRouter = require("./students");

function route(app) {
  app.get("/",coursesRouter);
  //app.get("/add", addPlayerPage);
  //app.get("/edit/:id", editPlayerPage);
  //app.get("/delete/:id", deletePlayer);
  //app.post("/add", addPlayer);
  //app.post("/edit/:id", editPlayer);
  
}

module.exports = route;
