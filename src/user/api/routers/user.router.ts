import {Router} from "express";
import {getUserListHandler} from "./handlers/get-user-list.handler";
import {createUserHandler} from "./handlers/create-user.handler";
import {deleteUserByIdHandler} from "./handlers/delete-user-by-id.handler";
import {userInputValidation} from "../../validation/users-input-dto.validation";
import {inputValidationMiddleware} from "../../../core/middlewares/validation/input-validation.middleware";


export const userRouter = Router();

userRouter
    .get(
        '',
        getUserListHandler
    )
    .post(
        '',
        userInputValidation,
        inputValidationMiddleware,
        createUserHandler
        )
    .delete(
        '/:id',
        deleteUserByIdHandler
    )