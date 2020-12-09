const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

//router.get('/search', adminController.search);

//newController.index;
router.get('/', adminController.index);

module.exports = router;
