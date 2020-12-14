const express = require('express');
const router = express.Router();

const enterpriseController = require('../app/controllers/EnterpriseController');

router.get('/create', enterpriseController.create);
//local /students/create => controller students create
router.get('/stored', enterpriseController.stored);
router.get('/:id_enterprise/edit',enterpriseController.edit);
router.put('/:id_enterprise',enterpriseController.update);
router.delete('/:id_enterprise',enterpriseController.delete);
router.post('/store',enterpriseController.store);
//router.get('/:slug', enterpriseController.show);
router.get('/', enterpriseController.index);

module.exports = router;


//http method put get delete post