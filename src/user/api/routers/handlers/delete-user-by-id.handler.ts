import { Request, Response} from "express";
import {matchedData} from "express-validator";
import {userCommandService} from "../../../domain/user.command.service";
import {HttpStatus} from "../../../../core/types/http-statuses";


export const deleteUserByIdHandler = async (req: Request, res: Response) => {
    const sanitizedParams = matchedData<{id: string}>(req, {
        locations: ['params'],
        includeOptionals: true,
    })

    const isDeleted = await userCommandService.delete(sanitizedParams.id)

    return res.sendStatus(isDeleted ? HttpStatus.NoContent_204 : HttpStatus.NotFound_404)
}