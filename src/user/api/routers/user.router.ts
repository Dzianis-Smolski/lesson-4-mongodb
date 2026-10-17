import {Router} from "express";
import {getUserListHandler} from "./handlers/get-user-list.handler";
import {createUserHandler} from "./handlers/create-user.handler";
import {deleteUserByIdHandler} from "./handlers/delete-user-by-id.handler";
import {userInputValidation} from "../../validation/users-input-dto.validation";
import {inputValidationMiddleware} from "../../../core/middlewares/validation/input-validation.middleware";
import {
    paginationAndSortingValidation
} from "../../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import {UserSortField} from "../../../core/types/sort-field";
import {superAdminGuardMiddleware} from "../../../auth/middlewares/super-admin.guard-middleware";
import {idValidation} from "../../../core/middlewares/validation/id.validation";


export const userRouter = Router();

userRouter
    .get(
        '',
        superAdminGuardMiddleware,
        paginationAndSortingValidation(UserSortField, 'user'),
        inputValidationMiddleware,
        getUserListHandler
    )
    .post(
        '',
        superAdminGuardMiddleware,
        userInputValidation,
        inputValidationMiddleware,
        createUserHandler
        )
    .delete(
        '/:id',
        superAdminGuardMiddleware,
        idValidation,
        inputValidationMiddleware,
        deleteUserByIdHandler
    )