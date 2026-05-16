import {Collection, MongoClient} from "mongodb";
import {SETTINGS} from "../core/settings/settings";
import {BlogDBModel} from "../blogs/types/blogs-types";
import {PostDBModel} from "../posts/types/posts-types";

const BLOGS_COLLECTION_NAME = 'blogs';
const POSTS_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let blogsCollection: Collection<BlogDBModel>;
export let postsCollection: Collection<PostDBModel>;
export async function runDB(url: string): Promise<void> {
    debugger
    client = new MongoClient(url);
    const db = await client.db(SETTINGS.DB_NAME);

    blogsCollection = db.collection(BLOGS_COLLECTION_NAME);
    postsCollection = db.collection(POSTS_COLLECTION_NAME);
    debugger
    try {
        await client.connect()
        debugger
        await db.command({ping: 1})
        console.log('Connected to DB');
    } catch (e) {
        await client.close();
        throw new Error('Database is not connected');
    }
}
