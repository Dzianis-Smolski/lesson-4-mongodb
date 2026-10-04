import {body} from "express-validator";

const loginValidation = body("login")
    .exists().withMessage("Login is required")
    .notEmpty().withMessage('Login can not be empty')
    .isString().withMessage('Login should be string')
    .trim()
    .isLength({ min: 1, max: 15 }).withMessage("Login length should be <= 15")

const passwordValidation = body("password")
    .exists().withMessage("Passwords is required")
    .notEmpty().withMessage('Password cannot be empty')
    .isString().withMessage('Password should be string')
    .trim()
    .isLength({ min: 6, max: 20}).withMessage("Password length should be <= 20")

const emailValidation = body("email")
    .exists()
    .withMessage('email is required')
    .bail()
    .notEmpty()
    .withMessage('email can not be empty')
    .bail()
    .isString()
    .withMessage('email should be string')
    .bail()
    .trim()
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    .withMessage("email should be a valid email")

export const userInputValidation = [loginValidation, passwordValidation, emailValidation]
