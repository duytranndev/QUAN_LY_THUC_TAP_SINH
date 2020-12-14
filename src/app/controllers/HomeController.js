//Import

const { mutipleMongooseToObject } = require('../../util/mongoose')

class HomeController {
    //[GET] /news
    index(req, res, next) {
        res.send("XIN CHAO DAY LA TRANG CHU");
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new HomeController();
