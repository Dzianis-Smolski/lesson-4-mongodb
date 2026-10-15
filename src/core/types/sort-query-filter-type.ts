export type SortQueryFilterType = {
    pageNumber: number;
    pageSize: number;
    sortDirection: 'asc' | 'desc';
    sortBy: string;
    searchLoginTerm?: string;
    searchEmailTerm?: string;
}