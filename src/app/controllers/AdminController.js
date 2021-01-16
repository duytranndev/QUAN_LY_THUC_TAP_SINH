const { getHomeAdmin } = require('../models/admin');
const { getStudent, getStudentBySlug } = require('../models/student');
const Student = require('../models/student');
class AdminController {
    index(req, res, next) {
        getStudent((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.render('admin', {
                students: results,
            });
        });
    }
}
module.exports = new AdminController();
