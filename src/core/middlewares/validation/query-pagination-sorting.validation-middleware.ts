import {query} from "express-validator";
import {SortDirection} from "../../types/sort-direction";
import {Mode} from "../../types/PaginationMode";

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_BY = 'createdAt';
export const DEFAULT_SEARCH_NAME_TERM = null;
export const DEFAULT_SEARCH_LOGIN_TERM = null;
export const DEFAULT_SEARCH_EMAIL_TERM = null;

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
                .default(DEFAULT_SEARCH_NAME_TERM)
                .isString()
                .trim()
                .isLength({ min: 1, max: 15 }),
            );
    }

    if (entityMode === 'user') {
        result.push(
            query('searchLoginTerm')
                .optional()
                .default(DEFAULT_SEARCH_LOGIN_TERM)
                .isString()
                .trim()
                .isLength({ min: 3, max: 10 }),
        )
        result.push(
            query('searchEmailTerm')
                .optional()
                .default(DEFAULT_SEARCH_EMAIL_TERM)
                .isString()
                .trim()
                .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
                .withMessage('searchEmailTerm must be a valid email')
        )
    }

    return result;
}