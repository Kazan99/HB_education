const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

// courses in to slug
router.get('/stored/courses/:slug/:id/edit', meController.editCourse);
router.put('/stored/courses/:slug/:id', meController.updateCourse);
router.patch('/courses/:slug/:id/restore', meController.restoreCourse);
router.delete('/stored/courses/:slug/:id', meController.destroyCourse);
router.delete('/stored/courses/:slug/:id/force', meController.forceDestroyCourse);
router.get('/stored/courses/:slug', meController.showStoredCourses);
router.get('/trash/courses/:slug', meController.showTrashCourses);

//courses
router.get('/stored/courses/:id/edit', meController.edit);
router.put('/courses/:id', meController.update);
router.patch('/courses/:id/restore', meController.restore);
router.delete('/courses/:id', meController.destroy);
router.delete('/courses/:id/force', meController.forceDestroy);
router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);

//user
router.get('/stored/user/:id/edit', meController.editUser);
router.put('/user/:id', meController.updateUser);
router.patch('/user/:id/restore', meController.restoreUser);
router.delete('/user/:id', meController.destroyUser);
router.delete('/user/:id/force', meController.forceDestroyUser);
router.get('/stored/user', meController.storedUser);
router.get('/trash/user', meController.trashUser);


router.get('/course/add', meController.addCourse);
router.post('/course/new', meController.newCourse);
router.get('/create', meController.create);
router.post('/store', meController.store);

module.exports = router;