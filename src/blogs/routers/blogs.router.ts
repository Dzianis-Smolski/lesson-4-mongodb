import {Router} from "express";
import { getBlogListHandler} from "./handlers/get-blog-list.handler";
import {createNewBlog} from "./handlers/create-new-blog.handler";
import {updateBlogById} from "./handlers/update-blog-by-id.handler";
import {getBlogById} from "./handlers/get-blog-by-id.handler";
import {deleteBlogById} from "./handlers/delete-blog-by-id.handler";
import {blogInputDtoValidation} from "../validation/blogs-input-dto.validation";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {inputValidationMiddleware} from "../../core/middlewares/validation/input-validation.middleware";
import {idValidation} from "../../core/middlewares/validation/id.validation";
import {createNewPostForBlog} from "./handlers/createNewPostForBlog";
import {getPostsOfBlog} from "./handlers/getPostsOfBlog";
import {postInputValidation} from "../../posts/validation/posts-dto.validation";
import {
    paginationAndSortingValidation
} from "../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import {BlogSortField} from "./input/blog-sort-field";


export const blogsRouter = Router();

blogsRouter
    .get(
        '',
        paginationAndSortingValidation(BlogSortField),
        getBlogListHandler
    )
    .get(
        '/:id',
        idValidation,
        inputValidationMiddleware,
        getBlogById
    )
    .get(
        '/:id/posts',
        idValidation,
        getPostsOfBlog
    )
    .post(
        '',
        superAdminGuardMiddleware,
        blogInputDtoValidation,
        inputValidationMiddleware,
        createNewBlog
    )
    .post('/:id/posts',
        superAdminGuardMiddleware,
        idValidation,
        postInputValidation,
        inputValidationMiddleware,
        createNewPostForBlog,
    )
    .put(
        "/:id",
        superAdminGuardMiddleware,
        idValidation,
        blogInputDtoValidation,
        inputValidationMiddleware,
        updateBlogById
    )
    .delete(
        '/:id',
        superAdminGuardMiddleware,
        idValidation,
        inputValidationMiddleware,
        deleteBlogById
    )