import {body} from "express-validator";

const nameValidation = body("name")
    .exists().withMessage('name is required')
    .notEmpty().withMessage('name can not be empty')
    .isString().withMessage('name should be string')
    .trim()
    .isLength({ min: 1, max: 15 }).withMessage("name length should be <= 15")


const descriptionValidation = body("description")
    .exists().withMessage('description is required')
    .notEmpty().withMessage('description can not be empty')
    .isString().withMessage('description should be string')
    .trim()

const websiteUrlValidation = body("websiteUrl")
    .exists()
    .withMessage('websiteUrl is required')
    .bail()
    .notEmpty()
    .withMessage('websiteUrl can not be empty')
    .bail()
    .isString()
    .withMessage('websiteUrl should be string')
    .bail()
    .trim()
    .isLength({ min: 12, max: 100 })
    .withMessage("websiteUrl length should be <= 100")
    .bail()
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/.*)?$/)
    .withMessage("websiteUrl should be a valid URL")

export const blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
]
