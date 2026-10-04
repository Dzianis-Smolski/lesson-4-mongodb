export type SortQueryFilterType = {
    pageNumber: number,
    pageSize: number,
    sortDirection: 'asc' | 'desc',
    searchLoginTerm: string,
    searchEmailTerm: string,
}