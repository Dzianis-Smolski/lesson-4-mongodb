import {Router} from "express";
import {getBlogList} from "./handlers/get-blog-list.handler";
import {createNewBlog} from "./handlers/create-new-blog.handler";
import {updateBlogById} from "./handlers/update-blog-by-id.handler";
import {getBlogById} from "./handlers/get-blog-by-id.handler";
import {deleteBlogById} from "./handlers/delete-blog-by-id.handler";
import {blogInputDtoValidation} from "../validation/blogs-input-dto.validation";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {inputValidationMiddleware} from "../../core/middlewares/validation/input-validation.middleware";
import {idValidation} from "../../core/middlewares/validation/id.validation";


export const blogsRouter = Router();

blogsRouter
    .get(
        '',
        getBlogList
    )
    .post(
        '',
        superAdminGuardMiddleware,
        blogInputDtoValidation,
        inputValidationMiddleware,
        createNewBlog
    )
    .put(
        "/:id",
        superAdminGuardMiddleware,
        idValidation,
        blogInputDtoValidation,
        inputValidationMiddleware,
        updateBlogById
    )
    .get(
        '/:id',
        idValidation,
        inputValidationMiddleware,
        getBlogById
    )
    .delete(
        '/:id',
        superAdminGuardMiddleware,
        idValidation,
        inputValidationMiddleware,
        deleteBlogById
    )