import {WithId} from "mongodb";
import {PostDBModel} from "../../types/posts-types";
import {mapToPostViewModel} from "./map-to-post-view-mode.util";
import {PaginationMeta} from "../../../core/types/pagination";



export const mapToBlogListPaginatedOutput = (
    posts: WithId<PostDBModel>[],
    meta: PaginationMeta
) => {

return {
        ...meta,
        items: posts.map((post: WithId<PostDBModel>) => {
            return mapToPostViewModel(post)
        })
    }
}