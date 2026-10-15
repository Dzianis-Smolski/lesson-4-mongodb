export type PaginationMeta = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
};

export type PaginationResult<T> = PaginationMeta & {
    items: T[];
};