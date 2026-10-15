import {WithId} from "mongodb";
import {PostDBModel} from "../types/posts-types";
import {PostListPaginatedOutput, PostOutputViewModel} from "../output/post.output";
import {mapToPostViewModel} from "./map-to-post-view-model.util";
import {PaginationMeta} from "../../core/types/pagination";



export const mapToPostListPaginatedOutput = (
    blogs: WithId<PostDBModel>[],
    meta: PaginationMeta
): PostListPaginatedOutput => {

return {
        ...meta,
        items: blogs.map((post: WithId<PostDBModel>): PostOutputViewModel => mapToPostViewModel(post))
    }
}