import {body} from "express-validator";


const  loginOrEmailValidation = body('loginOrEmail')
    .exists().withMessage('login or Email is required')
    .notEmpty().withMessage('login or Email can not be empty')
    .isString().withMessage('login or Email should be string')

const  passwordValidation = body('password')
    .exists().withMessage('password is required')
    .notEmpty().withMessage('password can not be empty')
    .isString().withMessage('password should be string')

export const authLoginValidation = [
    loginOrEmailValidation,
    passwordValidation,
]