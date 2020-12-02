const newsRouter = require('./news');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const studentRouter = require('./students');

function route(app) {

    app.use('/news', newsRouter);
    app.use('/courses',coursesRouter);
    app.use('/students',studentRouter );
    app.use('/', siteRouter);
}

module.exports = route;
