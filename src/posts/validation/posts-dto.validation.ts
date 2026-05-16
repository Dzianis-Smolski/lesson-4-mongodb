import { body } from "express-validator";
import {blogRepository} from "../../blogs/repositories/blogs.repository";

export const postInputValidation = [
    body("title")
    .exists().withMessage("title is required")
    .isString().withMessage("title should be string")
    .trim()
    .isLength({ min: 1, max: 30 }).withMessage("title should be max 30 symbols"),

    body("shortDescription")
    .exists().withMessage("shortDescription is required")
    .isString().withMessage("shortDescription should be string")
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage("shortDescription should be max 100 symbols"),

    body("content")
    .exists().withMessage("content is required")
    .isString().withMessage("content should be string")
    .trim()
    .isLength({ min: 1, max: 1000 }).withMessage("content should be max 1000 symbols"),

    body("blogId")
    .exists().withMessage("blogId is required")
    .isString().withMessage("blogId should be string")
    .custom((value) => {
        const blog = blogRepository.findById(value);
        if (!blog) throw new Error("blogId does not exist");
        return true;
    })
];
