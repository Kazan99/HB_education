const jwt = require('jsonwebtoken');


const middlewareController = {

    //verifyToken
    verifyToken(req, res, next) {
        const token = req.cookies.token;
        if (token) {
            jwt.verify(token, process.env.Access, (err, user) => {
                if (err) {
                    res.status(403).json('Token is not vaid');
                }
                res.user = user;
                //console.log(user);
                next();
            });
        }
        else {
            res.status(401).json("You're not Authenticated");
        }
    },

    //verifyToken And Admin
    verifyTokenAndAdmin(req, res, next) {
        middlewareController.verifyToken(req, res, () => {
            //console.log(res.user.admin);
            if (res.user.admin == 'admin') {
                next();
            }
            else {
                res.status(403).render('error', { UserName: req.cookies.name });
            }
        });
    },

    //user 
    // userToken(req, res, next) {

    //     Promise.all([])
    //         .then(() => {
    //             if(!(req.cookies.nameUser)) {
    //                 res.redirect(`/`, {
    //                     nameUser: 'Вы не вошли в систему',
    //                 })
    //             }
    //             else {
    //                 res.redirect(`/`, {
    //                     nameUser: req.cookies.nameUser,
    //                 })
    //             }
    //         })
    //         .catch(next);

        
    // }
};

module.exports = middlewareController;