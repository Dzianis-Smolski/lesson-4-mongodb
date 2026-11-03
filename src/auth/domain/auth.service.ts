import {usersQueryRepository} from "../../user/infrastructure/user.query.repository";
import {bcryptService} from "../dapters/bcrypt.service";


export const authService = async (loginOrEmail: string, password: string) => {
    const user =  await usersQueryRepository.loginOrEmail(loginOrEmail)

    if (user !== null) {
        return bcryptService.checkPassword(password, user.passwordHash)
    } else {
        return false;
    }
}