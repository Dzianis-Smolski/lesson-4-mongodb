import {BlogSortField} from "./blog-sort-field";
import {SortDirection} from "../../../core/types/sort-direction";


export type BlogQueryInput = {
    searchNameTerm: string | null;
    pageNumber: number;
    pageSize: number;
    sortBy: BlogSortField;
    sortDirection: SortDirection;
};

