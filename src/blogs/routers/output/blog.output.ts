import {PaginationMeta} from "../../../core/types/pagination";

export type BlogOutputViewModel = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: Date,
    isMembership: boolean
}

export type BlogListPaginatedOutput = PaginationMeta & {
    items: BlogOutputViewModel[],
}