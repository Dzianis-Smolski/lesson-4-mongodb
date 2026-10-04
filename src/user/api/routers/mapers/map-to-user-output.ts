import {WithId} from "mongodb";
import {usersDbDTO} from "../../../dto/user-db-dto";
import {userOutPutDTO} from "../../../dto/users-output-dto";


export const mapToUserOutput = (user: WithId<usersDbDTO>): userOutPutDTO => {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
    }
}