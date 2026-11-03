import {Router} from "express";
import {authLoginHandler} from "../handlers/authLoginHandler";
import {authLoginValidation} from "../validation/auth-input-dto-validation";
import {inputValidationMiddleware} from "../../core/middlewares/validation/input-validation.middleware";


export const authRouter = Router();

authRouter
    .post(
        '/login',
        authLoginValidation,
        inputValidationMiddleware,
        authLoginHandler
    )