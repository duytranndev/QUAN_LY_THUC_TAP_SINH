const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

//router.get('/create', courseController.create);
//router.get('/:slug', courseController.show);
router.get('/create',courseController.create);
router.post('/store',courseController.store);
router.get('/:name/edit',courseController.edit)
router.put('/:name', courseController.update);
router.get('/stored',courseController.stored);
router.get('/:slug', courseController.show);
router.get('/', courseController.index);

module.exports = router;
