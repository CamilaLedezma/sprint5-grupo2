const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();
const uploadAvatar = require("../middlewares/multerAvatar");
const validRegister = require("../middlewares/registerMiddleware");
const validLogin=require("../middlewares/loginMiddleware")
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")


router.get('/register',guestMiddleware, userController.register);

router.post('/register',uploadAvatar.single('avatar'), validRegister, userController.processRegister);

// Formulario de login despues agregar, 
router.get('/login', validLogin, guestMiddleware, userController.login);
// Procesar el login
router.post('/login', userController.loginProcess);
// Perfil de Usuario, 
router.get('/profile/', authMiddleware, userController.profile);
// Logout
router.get('/logout/', userController.logout);


module.exports = router;