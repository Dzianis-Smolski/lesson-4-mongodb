import {usersInput} from "../dto/users-input-dto";
import {bcryptService} from "../../auth/dapters/bcrypt.service";
import {usersDbDTO} from "../dto/user-db-dto";
import {userRepository} from "../infrastructure/user.repository";
import {WithId} from "mongodb";


export const userCommandService = {
    async create(inputDTO: usersInput): Promise<WithId<usersDbDTO>> {
        const { login, password, email } = inputDTO;

        const passwordHash = await bcryptService.generateHash(password);

        const newUser: usersDbDTO = {
            login,
            email,
            passwordHash,
            createdAt: new Date(),
        };

        return await userRepository.create(newUser);
    },

    async update(dto: any): Promise<any> {

    },
    async delete(dto: any): Promise<any> {
        // const user = await usersRepository.findById(id);
        // if (!user) return false;
        //
        // return await usersRepository.delete(id);
    }
}