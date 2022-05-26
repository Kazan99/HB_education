const Course = require('../models/Course');
const CourseShow = require('../models/CourseShow');
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
const mongoose = require('mongoose');



class CoursesController {


    // [GET] /courses
    course(req, res, next) {
        const Courses = mongoose.model('courses', Course );
        Courses.find({})
            .then(courses => {
                res.render('courses/courses', {
                    courses: mutipleMongooseToObject(courses),
                    UserName: req.cookies.name,
                });
            })
            .catch(next);
        
    }

    // [GET] /courses/:slug
    show(req, res, next) {
        const name = req.params.slug;

        const course = mongoose.model(`${name}`, CourseShow); 

        Promise.all([course.find({}), course.findOne({_id: req.query._id})])
            .then(([course, courseID]) => 
                res.render('courses/show', {
                    courseID:  mongooseToObject(courseID),
                    course:  mutipleMongooseToObject(course),
                    UserName: req.cookies.name,           
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

        
   
}

module.exports = new CoursesController;