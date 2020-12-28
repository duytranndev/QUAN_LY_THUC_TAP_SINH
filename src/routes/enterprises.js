const express = require('express');
const router = express.Router();

const enterpriseController = require('../app/controllers/EnterpriseController');
const instructorController = require('../app/controllers/InstructorController');
const postController = require('../app/controllers/PostController');
const courseController = require('../app/controllers/CourseController');
const manageController = require('../app/controllers/ManageController');

router.get('/create', enterpriseController.create);
//local /students/create => controller students create
router.get('/stored', enterpriseController.stored);

router.get('/:id_enterprise/edit',enterpriseController.edit);

router.put('/:id_enterprise',enterpriseController.update);

router.delete('/:id_enterprise',enterpriseController.delete);

router.post('/store',enterpriseController.store);

router.get('/:slug', enterpriseController.show);




//Quan ly router cua ENTERPIRSE POST
router.get('/:id_enterprise/posts',postController.index);

router.get('/:id_enterprise/posts/create',postController.create);

router.post('/:id_enterprise/posts/store',postController.store);

router.get('/:id_enterprise/posts/stored',postController.stored);

router.get('/:id_enterprise/posts/:id_post/edit',postController.edit);

router.put('/:id_enterprise/posts/:id_post',postController.update);

router.delete('/:id_enterprise/posts/:id_post',postController.delete);

router.get('/:id_enterprise/posts/:slug', postController.show);

// quan ly router cua enterprise instructor
router.get('/:id_enterprise/instructors',instructorController.index);

router.get('/:id_enterprise/instructors/create',instructorController.create);

router.post('/:id_enterprise/instructors/store',instructorController.store);

router.get('/:id_enterprise/instructors/stored',instructorController.stored);

router.get('/:id_enterprise/instructors/:id_instructor/edit',instructorController.edit);

router.put('/:id_enterprise/instructors/:id_instructor',instructorController.update);

router.delete('/:id_enterprise/instructors/:id_instructor',instructorController.delete);

router.get('/:id_enterprise/instructors/:slug', instructorController.show);

//Quan ly router cua ENTERPIRSE courses


router.get('/:id_enterprise/courses',courseController.index);

router.get('/:id_enterprise/courses/create',courseController.create);

router.post('/:id_enterprise/courses/store',courseController.store);

router.get('/:id_enterprise/courses/stored',courseController.stored);

router.get('/:id_enterprise/courses/:id_course/edit',courseController.edit);

router.put('/:id_enterprise/courses/:id_course',courseController.update);

router.delete('/:id_enterprise/courses/:id_course',courseController.delete);

router.get('/:id_enterprise/courses/:slug', instructorController.show);

// Quan ly router cua MANAGE

router.get('/:id_enterprise/manages',manageController.index);

router.get('/:id_enterprise/manages',manageController.index);

router.get('/:id_enterprise/manages/create',manageController.create);

router.post('/:id_enterprise/manages/store',manageController.store);

router.get('/:id_enterprise/manages/stored',manageController.stored);

router.get('/:id_enterprise/manages/:id_manage/edit',manageController.edit);

router.put('/:id_enterprise/manages/:id_manage',manageController.update);

router.delete('/:id_enterprise/manages/:id_manage',manageController.delete);

router.get('/:id_enterprise/manages/:slug', instructorController.show);

// index enterprise
router.get('/', enterpriseController.index);

module.exports = router;


//http method put get delete post