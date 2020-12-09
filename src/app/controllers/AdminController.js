const { getHomeAdmin } = require("../models/admin");

class AdminController {

    index(req, res, next){
        getHomeAdmin(req, res, next);
    }
    
}
module.exports = new AdminController();
