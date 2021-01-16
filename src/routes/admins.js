const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
const studentController = require('../app/controllers/StudentController');
const enterpriseController = require('../app/controllers/EnterpriseController');

//router.get('/search', adminController.search);

//newController.index;

//for STUDENT
router.get('/students/create', studentController.create);
router.get('/students/stored', studentController.stored);
router.get('/students/:id_student/edit', studentController.edit);
router.put('/students/:id_student', studentController.update);
router.delete('/students/:id_student', studentController.delete);
router.post('/students/store', studentController.store);
router.get('/students/:slug', studentController.show);
router.get('/students', studentController.index);

//for ENTERPRISE

router.get('/enterprises/create', enterpriseController.create);
router.get('/enterprises/stored', enterpriseController.stored);
router.get('/enterprises/:id_enterprise/edit', enterpriseController.edit);
router.put('/enterprises/:id_enterprise', enterpriseController.update);
router.delete('/enterprises/:id_enterprise', enterpriseController.delete);
router.post('/enterprises/store', enterpriseController.store);
router.get('/enterprises/:slug', enterpriseController.show);
router.get('/enterprises', enterpriseController.index);

//Quan ly router cua ENTERPIRSE POST

router.get('/', adminController.index);

module.exports = router;
