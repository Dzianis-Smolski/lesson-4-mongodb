import {Request, Response} from 'express'
import {AuthDto} from "../DTO/auth.dto";
import {authService} from "../domain/auth.service";
import {HttpStatus} from "../../core/types/http-statuses";
import {matchedData} from "express-validator";

export const authLoginHandler = async (req: Request<{}, unknown, AuthDto>, res: Response) => {

    const sanitizedBody = matchedData<AuthDto>(req, {
        locations: ['body'],
        includeOptionals: true,
    })

    const  { loginOrEmail, password } = sanitizedBody;

    const isAuthenticated = await authService(loginOrEmail, password)

    return isAuthenticated ? res.sendStatus(HttpStatus.NoContent_204) : res.sendStatus(HttpStatus.Unauthorized_401)
}