const User = require('../models/Account');
const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { replace } = require('../../util/replace');
const mongoose = require('mongoose');


class UsersController {
    users(req, res, next) {

        User.findById(res.user._id)
            .then(users => res.render('user/editUsers', {
                users: mongooseToObject(users),
                UserName: req.cookies.name,
                UserRole: req.cookies.role,
            }))
            .catch(next);



    }

    updateUsers(req, res, next) {
        // User.updateOne({ _id: res.user._id }, req.body)
        //     .then(() => res.redirect(`/`))
        //     .catch(next);
        const nameUser = req.body.nameUser;
        Promise.all([User.updateOne({ _id: res.user._id }, req.body)])
            .then(() => {
                res.clearCookie('name');
                res.cookie('name', nameUser);
                res.redirect(`/`);
            })
            .catch(next);
    }

    courseUser(req, res, next) {
        const Courses = mongoose.model('courses', Course);
        const courseSlug = `[${req.cookies.course}]`;
        //const courseSlug = req.cookies.course;
        

        Courses.find({slug: JSON.parse(replace(courseSlug))})
            .then(data => res.render('user/coursesUsers', {
                data: mutipleMongooseToObject(data),
                UserName: req.cookies.name,
                UserRole: req.cookies.role,
            }))
            .catch(next);

        
        // console.log(JSON.parse(replace(`[${courseSlug}]`)));
        // console.log([courseSlug]);

    }
}

module.exports = new UsersController;