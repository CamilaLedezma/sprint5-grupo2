
const {body}=require('express-validator')

const validator=[
    body('name').notEmpty().withMessage('Ingrese un nombre'),
    body('email').isEmail().withMessage('Ingrese un mail valido'),
    body('pass').notEmpty().withMessage('Ingrese una coontraseña')
    .isLength(8).withMessage('Debe contener al menos 8 caracteres')
]
module.exports =validator;