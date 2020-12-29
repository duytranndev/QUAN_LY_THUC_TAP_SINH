const route = require('color-convert/route');
const { Router } = require('express');
const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

router.get('/search', homeController.search);
//newController.index;
router.get('/services',homeController.services)
router.get('/about',homeController.about)
router.get('/', homeController.index);

module.exports = router;
