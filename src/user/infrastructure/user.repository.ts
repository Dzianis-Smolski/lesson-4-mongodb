import {usersDbDTO} from "../dto/user-db-dto";
import {userWriteCollection} from "../../db/mongo.write.db";
import {WithId} from "mongodb";

export const userRepository = {
    async create(newUser: usersDbDTO) : Promise<WithId<usersDbDTO>>  {
        const insertResult = await userWriteCollection.insertOne(newUser)

        return {
            _id: insertResult.insertedId,
            ...newUser
        }
    },

    async delete(id: string): Promise<boolean> {
        return true;
    },
}