import {BlogQueryInput} from "../routers/input/blog-query.input";
import {BlogDBModel, BlogViewModel} from "../types/blogs-types";
import {blogRepository} from "../repositories/blogs.repository";
import {WithId} from "mongodb";

export const blogsService = {
    async findMany(queryDTO: BlogQueryInput)
            : Promise<{items: WithId<BlogDBModel>[], totalCount: number}> {
        return blogRepository.findMany(queryDTO)
    },

    async findById(id: string) {

    },

    async create() {

    },

    async update() {

    },

    async delete(id: string) {

    },
}