import {Collection, MongoClient} from "mongodb";
import {SETTINGS} from "../core/settings/settings";
import {userReadDTO} from "../user/dto/users-read-dto";

const USER_COLLECTION_NAME = 'user-view';

export let readClient : MongoClient;
export let userReadCollection: Collection<userReadDTO>;
export async function runReadDB(url: string): Promise<void> {
    readClient = new MongoClient(url);
    const db = readClient.db(SETTINGS.DB_READ_NAME);

    userReadCollection = db.collection(USER_COLLECTION_NAME);
    try {
        await readClient .connect()
        await db.command({ping: 1})
        console.log('Connected to READ_DB');
    } catch (e) {
        await readClient .close();
        throw new Error('READ_DB is not connected');
    }
}
