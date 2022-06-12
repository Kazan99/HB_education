
const siteRoutes = require('./site');
const newRoutes = require('./new');
const coursesRoutes = require('./courses');
const meRoutes = require('./me');
const usersRoutes = require('./users');
const middlewareController = require('../app/middleware/MiddlewareController');
const CheckAuth = require('../app/auth/CheckAuth');


function route (app) {
    app.use('/users', middlewareController.verifyToken, usersRoutes);
    app.use('/me', middlewareController.verifyTokenAndAdmin,  meRoutes);
    app.use('/courses', middlewareController.verifyToken, coursesRoutes);
    app.use('/new', newRoutes);
    app.use('/', siteRoutes);

      
}

module.exports = route;