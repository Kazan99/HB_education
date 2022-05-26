const Account = require('../models/Account');
const authController = require('../auth/AuthController');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
//require('dotenv').config();
const jwt = require('jsonwebtoken');

class SiteController {

    // [GET] /register
    register(req, res, next) {
        res.render('register', { UserName: req.cookies.name });
    }


    //[POST] /register/user
    registerUser(req, res, next) {

        const nameUser = req.body.nameUser;
        const emailUser = req.body.email;
        const passwordUser = req.body.password;

        const newUser = new Account(req.body);

        newUser.save()
            .then(() => res.redirect(`/login`))
            .catch(error => {
                //res.send('Электронная почта уже используется');
                //res.status(401).send({message : 'Электронная почта уже используется'});
                res.render('register', {
                    message: 'Электронная почта уже используется',
                })
            });

    }


    // [GET] /login
    login(req, res, next) {
        res.render('login', { UserName: req.cookies.name });
    }


    //[POST] /login/user
    loginUser(req, res, next) {

        const emailUser = req.body.email;
        const passwordUser = req.body.password;

        Account.findOne({
            email: emailUser,
            password: passwordUser,
        })
            .then(data => {

                if (data) {
                    const accessToken = authController.generateAccessToken(data);
                    const name = data.nameUser;
                    res.cookie('token', accessToken, {
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        sameSite: 'strict',
                    });
                    res.cookie('name', name);

                    res.redirect('/');
                }
                else {
                    return res.render('login', {
                        message: 'Неправильный адрес электронной почты или пароль',
                    })
                }

            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Ошибка сервера');
            });

    }


    //[POST] /logout
    userLogout(req, res, next) {

        Promise.all([])
            .then(() => {
                res.clearCookie('name');
                res.clearCookie('token');
                res.status(200).redirect(`/`);
            })
            .catch(next);

    }

    // [GET] /home
    index(req, res, next) {

        res.render('home', { UserName: req.cookies.name });
    }

}

module.exports = new SiteController;