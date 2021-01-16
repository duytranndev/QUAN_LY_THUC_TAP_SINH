const { getHomeAdmin } = require('../models/admin');
const { getStudent, getStudentBySlug } = require('../models/student');
const Student = require('../models/student');
class AdminController {
    index(req, res, next) {
        // Student.find({})
        //   .then(students => res.render("admin",{ students }))
        //   .catch(next);
        //   console.log('students', res)
        Student.find({})
            .then((students) => {
                students = students.map((students) => students.toObject());
                res.render('admin', { students });
            })
            .catch(next);

        // getStudent((err, results) => {
        //   if (err) {
        //     console.log(err);
        //     return;
        //   }
        //   return res.render("admin", {
        //     students: results,
        //   });
        // });
    }
}
module.exports = new AdminController();
