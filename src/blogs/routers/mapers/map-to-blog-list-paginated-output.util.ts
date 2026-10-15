import {WithId} from "mongodb";
import {BlogDBModel} from "../input/blogs-types";
import {BlogListPaginatedOutput, BlogOutputViewModel} from "../output/blog.output";
import {mapToBlogViewModel} from "./map-to-blog-view-model.util";
import {PaginationMeta} from "../../../core/types/pagination";



export const mapToBlogListPaginatedOutput = (
    blogs: WithId<BlogDBModel>[],
    meta: PaginationMeta
): BlogListPaginatedOutput => {

return {
        ...meta,
        items: blogs.map((blog: WithId<BlogDBModel>): BlogOutputViewModel => mapToBlogViewModel(blog))
    }
}