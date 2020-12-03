//Import
const getHomePage = require('../models/course');
const { mutipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    //[GET] /news
    index(req, res, next) {
        //etHomePage();
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
