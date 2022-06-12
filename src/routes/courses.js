const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');
const middlewareController = require('../app/middleware/MiddlewareController');

router.put('/:slug/save',middlewareController.verifyToken, coursesController.saveSlug);
router.get('/:slug',middlewareController.verifyToken, coursesController.show);
router.get('/',middlewareController.verifyToken, coursesController.course);


module.exports = router;