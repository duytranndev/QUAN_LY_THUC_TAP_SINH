const express = require('express');
const router = express.Router();

const studentController = require('../app/controllers/StudentController');

router.get('/create', studentController.create);
//local /students/create => controller students create
router.get('/stored', studentController.stored);
router.get('/:id_student/edit',studentController.edit);
router.put('/:id_student',studentController.update);
router.delete('/:id_student',studentController.delete);
router.post('/store',studentController.store);
router.get('/:slug', studentController.show);
router.get('/', studentController.index);

module.exports = router;


//http method put get delete post