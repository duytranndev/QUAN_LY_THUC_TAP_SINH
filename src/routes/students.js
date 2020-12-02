const express = require('express');
const router = express.Router();

const studentController = require('../app/controllers/StudentController');

router.get('/:slug', studentController.show);

router.get('/', studentController.index);

module.exports = router;
