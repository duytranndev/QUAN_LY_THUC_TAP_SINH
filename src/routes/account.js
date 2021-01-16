const express = require('express');
const router = express.Router();
const account = require('../app/controllers/AccountController');
const db = require('../config/db/database');
router.get('/login', account.index);
router.get('/', account.index);
router.get('/sign', account.sign);
// for action
router.post('/login', function (request, response) {
    console.log('request', request);
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        // check if user exists
        db.query(
            'SELECT * FROM user WHERE username = ? AND password = ?',
            [username, password],
            function (error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/home');
                } else {
                    response.send('Incorrect Username and/or Password!');
                }
                response.end();
            },
        );
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

router.post('/sign', (req, res) => {
    var users = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };

    db.query(
        'INSERT INTO user SET ?',
        users,
        function (error, results, fields) {
            if (error) {
                res.send({
                    code: 400,
                    failed: 'error ocurred',
                });
            } else {
                res.redirect('/login');
            }
        },
    );
});

module.exports = router;

//http method put get delete post
