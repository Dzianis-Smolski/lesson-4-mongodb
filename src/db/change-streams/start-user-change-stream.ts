import {userReadCollection} from "../mongo.read.db";
import {Collection} from "mongodb";
import {usersDbDTO} from "../../user/dto/user-db-dto";

export function startUserChangeStream(collection: Collection<usersDbDTO>) {
    const changeStream = collection.watch();

    changeStream.on("change", async (event: any) => {
        console.log("EVENT:", event);

        if (event.operationType === "insert") {
            const fullDocument = event.fullDocument;

            await userReadCollection.insertOne({
                id: fullDocument._id.toString(),
                login: fullDocument.login,
                email: fullDocument.email,
                createdAt: fullDocument.createdAt
            });
        }

        if (event.operationType === "update") {
            // обновление read‑модели
        }

        if (event.operationType === "delete") {
            // удаление из read‑модели
        }
    });
}