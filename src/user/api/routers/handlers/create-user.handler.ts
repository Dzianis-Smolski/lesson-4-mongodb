import {Request, Response, NextFunction} from "express";
import {matchedData} from "express-validator";
import {usersInput} from "../../../dto/users-input-dto";
import {userCommandService} from "../../../domain/user.command.service";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {mapToUserOutput} from "../mapers/map-to-user-output";


export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const sanitizeBody = matchedData<usersInput>(req, {
        locations: ['body'],
        includeOptionals: true,
    })

    const user = await userCommandService.create(sanitizeBody)

    return res.status(HttpStatus.Created_201).send(mapToUserOutput(user))
}