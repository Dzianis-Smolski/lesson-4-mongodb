import {Router} from "express";
import {getPostList} from "./handlers/get-post-list.handler";
import {createNewPost} from "./handlers/create-new-post.handler";
import {updatePostById} from "./handlers/update-post-by-id.handler";
import {getPostById} from "./handlers/get-post-by-id.handler";
import {deletePostById} from "./handlers/delete-post-by-id.handler";
import {postInputValidation} from "../validation/posts-dto.validation";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {idValidation} from "../../core/middlewares/validation/id.validation";
import {inputValidationMiddleware} from "../../core/middlewares/validation/input-validation.middleware";

export const postsRouter = Router();

postsRouter
    .get(
        '',
        getPostList
    )
    .post(
        '',
        superAdminGuardMiddleware,
        postInputValidation,
        inputValidationMiddleware,
        createNewPost
    )
    .put(
        "/:id",
        idValidation,
        superAdminGuardMiddleware,
        postInputValidation,
        inputValidationMiddleware,
        updatePostById
    )
    .get(
        '/:id',
        idValidation,
        inputValidationMiddleware,
        getPostById
    )
    .delete(
        '/:id',
        superAdminGuardMiddleware,
        idValidation,
        inputValidationMiddleware,
        deletePostById
    )