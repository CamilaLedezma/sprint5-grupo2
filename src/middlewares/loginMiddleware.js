
const { body } = require('express-validator');

const validationLogin= [
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('pass').notEmpty().withMessage('Tienes que escribir un password de 8 caracteres'),

	
]
module.exports=validationLogin;