const Account = require('../models/Account');
const authController = require('../auth/AuthController');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


class SiteController {

    // [GET] /register
    register(req, res, next) {

        res.render('register', {
        });

    }


    //[POST] /register/user
    registerUser(req, res, next) {

        const nameUser = req.body.nameUser;
        const emailUser = req.body.email;
        const passwordUser = req.body.password;
        if (nameUser != '' && emailUser != '' && passwordUser != '') {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
    
            const mailOptions = {
                from: 'HB education',
                to: `${req.body.email}`,
                subject: 'Письмо отправление через HB education',
                text: `Добро пожаловать, вы успешно зарегистрировались на сайте HB education. Эл. адрес: ${req.body.email}. Пароль: ${req.body.pass}`,
                html: `
                    <h1> Добро пожаловать, вы успешно зарегистрировались на сайте HB education. </h1>
                    <h3> Эл. адрес: ${req.body.email} </h3>
                    <h3> Пароль: ${req.body.password} </h3>
                `
    
            };

            const newUser = new Account(req.body);

            newUser.save()
                .then(() => {
                    transporter.sendMail(mailOptions);
                    res.redirect(`/login`);
                })
                .catch(error => {
                    //res.send('Электронная почта уже используется');
                    //res.status(401).send({message : 'Электронная почта уже используется'});
                    res.render('register', {
                        message: 'Электронная почта уже используется',
        
                    })
                });
        } else {
            res.render('register', {
                message: 'ko co gi',
            })
        }


    }


    // [GET] /login
    login(req, res, next) {


        res.render('login', {
        });


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
                    const role = data.role;
                    const courseSlug = data.course;

                    res.cookie('token', accessToken, {
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        sameSite: 'strict',
                    });
                    res.cookie('course', courseSlug);
                    res.cookie('name', name);
                    res.cookie('role', role);

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
                res.clearCookie('course');
                res.clearCookie('name');
                res.clearCookie('token');
                res.clearCookie('role');
                res.status(200).redirect(`/`);
            })
            .catch(next);


    }

    // [GET] /home
    index(req, res) {

        res.render('home', {
            UserName: req.cookies.name,
            UserRole: req.cookies.role,
        });

    }

}

module.exports = new SiteController;