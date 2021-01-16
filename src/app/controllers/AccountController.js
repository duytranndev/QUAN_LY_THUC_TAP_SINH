class AccountController {
    index(req, res, next) {
        res.render('login');
    }
    sign(req, res, next) {
        res.render('sign');
    }
}
module.exports = new AccountController();
