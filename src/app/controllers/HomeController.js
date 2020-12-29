//Import

const { mutipleMongooseToObject } = require('../../util/mongoose')

class HomeController {
    
    services(req,res){
        res.render('services')
    }
    about(req, res){
        res.render('about')
    }
    //[GET] /search
    search(req, res) {
        res.render('search');
    }//[GET] /news
    index(req, res, next) {
        res.render('home')
    }
}

module.exports = new HomeController();
