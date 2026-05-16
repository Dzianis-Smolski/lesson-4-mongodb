import {FieldValidationError, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {HttpStatus} from "../../types/http-statuses";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({onlyFirstError: true});

    if (errors.length > 0) {
        return res.status(HttpStatus.BadRequest).json({
            errorsMessages: errors.map(err  => ({
                message: err.msg,
                field: (err as unknown as FieldValidationError).path
            }))
        });
    }

    next();
};
