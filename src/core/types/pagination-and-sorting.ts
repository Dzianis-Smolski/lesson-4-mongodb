import {SortDirection} from "./sort-direction";

export type PaginationAndSorting<S> = {
    searchNameTerm?: string | null;
    pageNumber?: number;
    pageSize: number;
    sortBy?: S;
    sortDirection: SortDirection;
};