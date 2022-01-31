// ESTO SERIA EL GESTOR DEL MODELO
const User = require('../model/User');

const fs= require('fs');
const {validationResult} = require('express-validator');

//requiero para hashear contraseñas
const bcryptjs = require('bcryptjs');

const userController = {

    register : (req, res)=>{
        
        res.render('user/register')
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        // aca busca que el mail no exita ya registrado
        let userInDB = User.findByField('email', req.body.email);
        if (userInDB) {
            return res.render('user/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }
        //si paso las validaciones crea el usuario y encripta la contraseña
        let userToCreate = {
            ...req.body,
            pass: bcryptjs.hashSync(req.body.pass, 10),
            avatar: req.file.filename
        }
        User.create(userToCreate);
        return res.redirect('/login');
    },
    login : (req, res)=>{
        res.render('user/login');
    },
    loginProcess: (req, res) => {
        // busca el usuario x email si lo encuentra compara contraseña
        let userToLogin = User.findByField('email', req.body.email);
        if(userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.pass, userToLogin.pass);
            if (isOkThePassword) {
                delete userToLogin.pass;
                req.session.userLogged = userToLogin;
                if(req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                }
                return res.redirect('/profile');
            } 
            return res.render('user/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }
        return res.render('user/login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });
    },
    profile: (req, res) => {
        return res.render('user/profile', {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}
module.exports = userController;