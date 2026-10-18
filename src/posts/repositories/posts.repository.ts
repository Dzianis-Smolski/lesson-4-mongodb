import {PostCreateUpdateDTO, PostDBModel} from "../types/posts-types";
import {ObjectId, WithId} from "mongodb";
import {postsCollection} from "../../db/mongo.write.db";
import {PostQueryInput} from "../routers/input/post-qury.input";
import {PaginationAndSortingBase} from "../../core/types/pagination-and-sorting";

export const postRepository = {
    async findPostListByBlogId(blogId: string, queryDTO: PostQueryInput)
        : Promise<{items: WithId<PostDBModel>[]; totalCount: number}> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        } = queryDTO;

        const skip = (pageNumber -1) * pageSize;
        const filter = {blogId};
        const items: WithId<PostDBModel>[] = await postsCollection
            .find(filter)
            .sort({[sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray()

        const totalCount =await postsCollection.countDocuments(filter);

        return { items, totalCount };
    },

    async findAll(queryDTO: PaginationAndSortingBase<string>)
        : Promise<{items: WithId<PostDBModel>[]; totalCount: number}>  {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        } = queryDTO;
        const skip = (pageNumber -1) * pageSize;
        const filter: any = {};
        const items: WithId<PostDBModel>[] = await postsCollection
        .find(filter)
        .sort({[sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray()

        const totalCount =await postsCollection.countDocuments(filter);

        return { items, totalCount };
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
      return await postsCollection.deleteMany({});
    },
}