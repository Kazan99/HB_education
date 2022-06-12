class NewController {


    // [GET] /new
    new(req, res) {

        res.render('new', {
            UserName: req.cookies.name,
            UserRole: req.cookies.role,
            

        });


    }
    // [GET] /new/:slug
    show(req, res) {

        res.send('News DETAIL!!!', {
            UserName: req.cookies.name,
            UserRole: req.cookies.role,
            

        });

    }


}

module.exports = new NewController;