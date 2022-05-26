const CheckAuth = {

    //is not login
    checkNotAuthenticated(req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            return next();
        }

        res.redirect('/login');
    },

    //is login
    checkAuthenticated(req, res, next) {
        const token = req.cookies.token;
        if (token) {
            return res.redirect('/');
        }

        next();
    },


}

module.exports = CheckAuth;