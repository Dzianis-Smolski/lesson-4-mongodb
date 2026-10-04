import {query} from "express-validator";
import {SortDirection} from "../../types/sort-direction";
import {Mode} from "../../types/PaginationMode";

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_BY = 'createdAt';
export const DEFAULT_SEARCH_NAME_TERM = null;

export const paginationAndSortingValidation =  <T extends string>(sortFieldsEnum: Record<string, T>, entityMode: Mode) => {
    const allowedSortFields = Object.values(sortFieldsEnum)

    const result = [
        query('pageNumber')
            .default(DEFAULT_PAGE_NUMBER)
            .isInt({ min: 1 })
            .withMessage('Page number must be a positive integer')
            .toInt(),

        query('pageSize')
            .default(DEFAULT_PAGE_SIZE)
            .isInt({ min: 1, max: 100 })
            .withMessage('Page size must be between 1 and 100')
            .toInt(),

        query('sortBy')
            .default(Object.values(sortFieldsEnum)[0])
            .isIn(allowedSortFields)
            .withMessage(
                `Invalid sort field. Allowed values: ${allowedSortFields.join(', ')}`,
            ),

        query('sortDirection')
            .default(DEFAULT_SORT_DIRECTION)
            .isIn(Object.values(SortDirection))
            .withMessage(
                `Sort direction must be one of: ${Object.values(SortDirection).join(', ')}`,
            ),
    ]

    if (entityMode === 'blog') {
        result.push(
            query('searchNameTerm')
                .optional()
                .default(DEFAULT_SEARCH_NAME_TERM)
                .optional()
                .isString()
                .trim()
                .isLength({ min: 1, max: 15 }),
            );
    }

    return result;
}