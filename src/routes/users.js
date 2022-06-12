const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');

router.get('/my/course', usersController.courseUser);
router.put('/:id', usersController.updateUsers);
router.get('/info', usersController.users)


module.exports = router;