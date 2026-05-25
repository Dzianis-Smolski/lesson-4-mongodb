import {BlogQueryInput} from "../routers/input/blog-query.input";
import {BlogViewModel} from "../types/blogs-types";
import {blogRepository} from "../repositories/blogs.repository";
import {mapToBlogViewModel} from "../routers/mapers/map-to-blog-view-mode.util";
import {PaginationResult} from "../../core/types/pagination";


export const blogsService = {
    async findMany(queryInput: BlogQueryInput)
        : Promise<PaginationResult<BlogViewModel>>
    {
        const { items, totalCount } = await blogRepository.findMany((queryInput))

        return {
            pagesCount: Math.ceil(totalCount / queryInput.pageSize),
            page: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
            items: items.map(mapToBlogViewModel)
        };
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