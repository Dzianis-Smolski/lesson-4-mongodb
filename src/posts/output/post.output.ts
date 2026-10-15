import {PaginationMeta} from "../../core/types/pagination";


export type PostOutputViewModel = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date,
}

export type PostListPaginatedOutput = PaginationMeta & {
    items: PostOutputViewModel[],
}