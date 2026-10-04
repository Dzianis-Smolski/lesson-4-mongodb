import {Collection, MongoClient} from "mongodb";
import {SETTINGS} from "../core/settings/settings";
import {BlogDBModel} from "../blogs/routers/input/blogs-types";
import {PostDBModel} from "../posts/types/posts-types";
import {startUserChangeStream} from "./change-streams/start-user-change-stream";
import {usersDbDTO} from "../user/dto/user-db-dto";

const USERS_DB_COLLECTION_NAME = 'users';
const BLOGS_COLLECTION_NAME = 'blogs';
const POSTS_COLLECTION_NAME = 'posts';

export let writeClient : MongoClient;
export let userWriteCollection: Collection<usersDbDTO>;
export let blogsCollection: Collection<BlogDBModel>;
export let postsCollection: Collection<PostDBModel>;

export async function runWriteDB(url: string): Promise<void> {
    writeClient  = new MongoClient(url);
    const db = writeClient .db(SETTINGS.DB_WRITE_NAME);

    userWriteCollection = db.collection(USERS_DB_COLLECTION_NAME)
    blogsCollection = db.collection(BLOGS_COLLECTION_NAME);
    postsCollection = db.collection(POSTS_COLLECTION_NAME);

    startUserChangeStream(userWriteCollection)

    try {
        await writeClient .connect()
        await db.command({ping: 1})
        console.log('Connected to DB');
    } catch (e) {
        await writeClient .close();
        throw new Error('Database is not connected');
    }
}
