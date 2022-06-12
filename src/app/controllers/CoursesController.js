const Course = require('../models/Course');
const CourseShow = require('../models/CourseShow');
const User = require('../models/Account');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const mongoose = require('mongoose');



class CoursesController {


    // [GET] /courses
    course(req, res, next) {

        const Courses = mongoose.model('courses', Course);


        Courses.find({})
            .then(courses => {
                res.render('courses/courses', {
                    courses: mutipleMongooseToObject(courses),
                    UserName: req.cookies.name,
                    UserRole: req.cookies.role,


                });
            })
            .catch(next);

    }

    // [GET] /courses/:slug
    show(req, res, next) {

        const name = req.params.slug;

        const course = mongoose.model(`${name}`, CourseShow);

        Promise.all([course.find({}), course.findOne({ _id: req.query._id })])
            .then(([course, courseID]) =>
                res.render('courses/show', {
                    courseID: mongooseToObject(courseID),
                    course: mutipleMongooseToObject(course),
                    UserName: req.cookies.name,
                    UserRole: req.cookies.role,


                })
            )
            .catch(next);

        // user.findOne({_id: req.query._id})
        //     .then(course => {
        //         res.render('courses/show', {
        //             course:  mongooseToObject(course),           
        //         });

        //     })
        //     .catch(next);

        // user.find({})
        // .then(course => {
        //     res.render('courses/show', {
        //         course:  mutipleMongooseToObject(course),           
        //     });

        // })
        // .catch(next);



    }

    // [PUT] /courses/:slug/save
    saveSlug(req, res, next) {
        const slugName = req.params.slug;
        const courseSlug = req.cookies.course;

        
        const courseNew = courseSlug + `, '` + slugName + `'`;
        const id = res.user._id;
        
        // const user = new User ({course: `${courseNew}`});

        User.updateOne({ _id: id},{course: `${courseNew}`})
            .then(() => {
                res.clearCookie('course');
                res.cookie('course', courseNew);
                res.redirect(`/courses/${slugName}`);
            })
            .catch(error => {

            });

        console.log(req.cookies.course);
    }



}

module.exports = new CoursesController;