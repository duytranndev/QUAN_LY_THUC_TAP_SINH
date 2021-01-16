const homeController = require('./home');
const studentRouter = require('./students');
const adminRouter = require('./admins');
const enterpriseController = require('./enterprises');
const account = require('./account');
function route(app) {
    app.use('/enterprises', enterpriseController);
    app.use('/admin', adminRouter);
    app.use('/students', studentRouter);
    app.use('/home', homeController);
    app.use('/', account);
}

module.exports = route;
