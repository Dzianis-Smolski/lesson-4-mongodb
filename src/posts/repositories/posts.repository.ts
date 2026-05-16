import {PostCreateUpdateDTO, PostDBModel} from "../types/posts-types";
import {ObjectId, WithId} from "mongodb";
import {postsCollection} from "../../db/mongo.db";

export const postRepository = {
    async findAll(): Promise<WithId<PostDBModel>[]> {
        return postsCollection.find().toArray()
    },

    async createPost(newPost: PostDBModel): Promise<WithId<PostDBModel>> {
        const insertResult = await postsCollection.insertOne(newPost);
        return {...newPost, _id: insertResult.insertedId}
    },

    async findById(id: string): Promise<WithId<PostDBModel> | null> {
        return await postsCollection.findOne({_id: new ObjectId(id)})
    },

    async updatePost(id: string, dto: PostCreateUpdateDTO) {

        const updateResult = await postsCollection.updateOne({
                _id: new ObjectId(id),
            },
            {
                $set: {
                    title: dto.title,
                    shortDescription: dto.shortDescription,
                    content: dto.content,
                    blogId: dto.blogId,
                }
            }
        );
        if (updateResult.matchedCount === 0) {
            throw new Error("No blog with this id");
        }
        return;
    },

    async deletePostById(id: string): Promise<boolean> {
        const deleteResult = await postsCollection.deleteOne({_id: new ObjectId(id)})

        return !!deleteResult.deletedCount;
    },

    async deletePostList() {
      return await postsCollection.drop();
    },
}