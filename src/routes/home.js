const route = require('color-convert/route');
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../config/db/database');

const homeController = require('../app/controllers/HomeController');

router.get('/search', homeController.search);
//newController.index;
router.get('/contact', homeController.contact);
// router.get('/services', homeController.services);
router.get('/services', function (req, res) {
    db.query(`select * from news`, [], (error, results, fiedls) => {
        if (error) {
            return callBack(error);
        }
        return res.render('services', {
            news: results,
        });
    });
    // check if user exists
});
router.get('/about', homeController.about);
router.get('/', homeController.index);

module.exports = router;
