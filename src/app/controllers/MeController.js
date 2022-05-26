const Course = require('../models/Course');
const CourseShow = require('../models/CourseShow');
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
const mongoose = require('mongoose');



class MeController {


    // [GET] /me/create
    create(req, res, next) {
        
        res.render('me/create',{UserName: req.cookies.name});
        
    }

    // [POST] /me/store
    store(req, res, next) {
        
        // res.json(req.body);

        const Courses = mongoose.model('courses', Course);
        const coursesNew = new Courses(req.body);

        coursesNew.save()
            .then(() => res.redirect(`/me/stored/courses`))
            .catch(error => {

            });


    }

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        const Courses = mongoose.model('courses', Course );

        Promise.all([Courses.find({}), Courses.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => 
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                    UserName: req.cookies.name,
                })
            )
            .catch(next);

        // Courses.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: mutipleMongooseToObject(courses),
        //     }))
        //     .catch(next);
        
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        const Courses = mongoose.model('courses', Course );

        Courses.findDeleted({})
            .then(courses => 
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                    UserName: req.cookies.name,
                }),
            )
            .catch(next);
        
    }

    // [GET] /me/stored/courses/:id/edit
    edit(req, res, next) {
        const Courses = mongoose.model('courses', Course );

        Courses.findById(req.params.id)
            .then(course => res.render('me/edit', {
                course: mongooseToObject(course),
                UserName: req.cookies.name,
            }))
            .catch(next);
        
    }

    // [PUT] /me/courses/:id
    update(req, res,  next){
        
        const Courses = mongoose.model('courses', Course );

        Courses.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect(`/me/stored/courses`))
            .catch(next);
    }

    // [DELETE] /me/courses/:id
    destroy(req, res, next) {
        const Courses = mongoose.model('courses', Course );

        Courses.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /me/courses/:id/force
    forceDestroy(req, res, next) {
        const Courses = mongoose.model('courses', Course );

        Courses.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /me/courses/:id/restore
    restore(req, res, next) {
        const Courses = mongoose.model('courses', Course );

        Courses.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /me/stored/courses/:slug
    showStoredCourses(req, res, next) {
        const name = req.params.slug;

        const course = mongoose.model(`${name}`, CourseShow); 

        // course.find()
        //     .then(courses => res.render('me/stored-course-slug', {
        //         courses: mutipleMongooseToObject(courses),
        //     }))
        //     .catch(next);

        Promise.all([
            course.find({}), 
            course.findOneWithDeleted({slug: name}), 
            course.countDocumentsDeleted()
        ])
            .then(([courses, courseSlug, deletedCount]) => 
                res.render('me/stored-course-slug', {
                    deletedCount,
                    courseSlug:  mongooseToObject(courseSlug),
                    courses:  mutipleMongooseToObject(courses),
                    UserName: req.cookies.name,           
                })
            )
            .catch(next);
        
    }
    // [GET] /me/trash/courses/:slug
    showTrashCourses(req, res, next) {
        const name = req.params.slug;

        const course = mongoose.model(`${name}`, CourseShow); 

        // course.findDeleted({})
        //     .then(courses => res.render('me/trash-course-slug', {
        //         courses: mutipleMongooseToObject(courses),
        //     }))
        //     .catch(next);

        Promise.all([
            course.findDeleted({}), 
            course.findOneWithDeleted({slug: name})
        ])
            .then(([courses, courseSlug]) => 
                res.render('me/trash-course-slug', {
                    courseSlug:  mongooseToObject(courseSlug),
                    courses:  mutipleMongooseToObject(courses),
                    UserName: req.cookies.name,           
                })
            )
            .catch(next);
        
    }

    //[GET] /me/course/add
    addCourse(req, res, next) {
        const Courses = mongoose.model('courses', Course );

        Courses.find()
            .then(courses => res.render('me/create-course', {
                courses: mutipleMongooseToObject(courses),
                UserName: req.cookies.name,
            }))
            .catch(next);
    }

    //[Post] /me/course/new
    newCourse(req, res, next) {
        const name = req.body.slug;

        const course = mongoose.model(`${name}`, CourseShow);
        const courseNew = new course(req.body);

        courseNew.save()
            .then(() => res.redirect(`/me/stored/courses/${name}`))
            .catch(error => {

            });
        //res.json(req.body);
        //res.send('da luu');
    }

    // [GET] /me/stored/courses/:slug/:id/edit
    editCourse(req, res, next) {

        const name = req.params.slug;
        const id = req.params.id;

        const Courses = mongoose.model(`${name}`,  CourseShow);

        Courses.findById(id)
            .then(course => res.render('me/editCourse', {
                course: mongooseToObject(course),
                UserName: req.cookies.name,
            }))
            .catch(next);
        
    }

    // [PUT] /me/courses/:slug/:id
    updateCourse(req, res,  next){
        
        const name = req.params.slug;
        const id = req.params.id;


        const Courses = mongoose.model(`${name}`, CourseShow);

        Courses.updateOne({_id: id}, req.body)
            .then(() => res.redirect(`/me/stored/courses/${name}`))
            .catch(next);
    }
    
   // [DELETE] /me/courses/:slug/:id
   destroyCourse(req, res, next) {
        const name = req.params.slug;

        const Courses = mongoose.model(`${name}`, CourseShow);

        Courses.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /me/courses/:slug/:id/force
   forceDestroyCourse(req, res, next) {
        const name = req.params.slug;

        const Courses = mongoose.model(`${name}`, CourseShow);

        Courses.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);

    }

    // [PATCH] /me/courses/:slug/:id/restore
    restoreCourse(req, res, next) {
        const name = req.params.slug;

        const Courses = mongoose.model(`${name}`, CourseShow);


        Courses.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new MeController;