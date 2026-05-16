import { param } from "express-validator"
import {ObjectId} from "mongodb";

export const idValidation = [
    param("id")
    .exists().withMessage("id is required")
    .notEmpty().withMessage("id cannot be empty")
    .custom((id) => ObjectId.isValid(id))
    .withMessage("Invalid id format")
]