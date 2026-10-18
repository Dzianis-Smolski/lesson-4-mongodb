import {usersDbDTO} from "../dto/user-db-dto";
import {userWriteCollection} from "../../db/mongo.write.db";
import {ObjectId, WithId} from "mongodb";

export const userRepository = {
    async create(newUser: usersDbDTO) : Promise<WithId<usersDbDTO>>  {
        const insertResult = await userWriteCollection.insertOne(newUser)

        return {
            _id: insertResult.insertedId,
            ...newUser
        }
    },

    async delete(id: string): Promise<boolean> {
        const deleteResult = await userWriteCollection.deleteOne({_id: new ObjectId(id)})
        return !!deleteResult.deletedCount;
    },

    async deleteUserList() {
        return await userWriteCollection.deleteMany({});
    }
}