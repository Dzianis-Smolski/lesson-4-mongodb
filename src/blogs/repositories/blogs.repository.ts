import {BlogCreateUpdateDTO, BlogDBModel, BlogViewModel} from "../types/blogs-types";
import {blogsCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {BlogQueryInput} from "../routers/input/blog-query.input";

export const blogRepository = {
    async findMany(queryDTO: BlogQueryInput): Promise<{ items: WithId<BlogDBModel>[]; totalCount: number }> {
        const {
            searchNameTerm,
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        } = queryDTO;



        const skip = (pageNumber -1) * pageSize;
        const filter: any = {};

        if (searchNameTerm) {
            filter.name = { $regex: searchNameTerm, $options: 'i' };
        }

        const items = await blogsCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(pageSize)
        .toArray()

        const totalCount = await blogsCollection.countDocuments(filter);
        return { items, totalCount };
    },

    async findAll(): Promise<WithId<BlogDBModel>[]> {
        return blogsCollection.find().toArray()
    },

    async createBlog(newBlog: BlogDBModel): Promise<WithId<BlogDBModel>> {
        const insertResult = await blogsCollection.insertOne(newBlog);
        return {... newBlog, _id: insertResult.insertedId}
    },

    async findById(id: string): Promise<WithId<BlogDBModel> | null> {
        return await blogsCollection.findOne({_id: new ObjectId(id)})
    },

    async updateBlog(id: string, dto: BlogCreateUpdateDTO) {

        const updateResult = await blogsCollection.updateOne({
                _id: new ObjectId(id),
            },
            {
                $set: {
                    name: dto.name,
                    description: dto.description,
                    websiteUrl: dto.websiteUrl,
                }
            }
        );
        if (updateResult.matchedCount === 0) {
            throw new Error("No blog with this id");
        }
        return;
    },

    async deleteBlogById(id: string): Promise<boolean> {
        const deleteResult = await blogsCollection.deleteOne({_id: new ObjectId(id)})

        return !!deleteResult.deletedCount;
    },

    async deleteBlogList() {
        return await blogsCollection.drop();
    }
}