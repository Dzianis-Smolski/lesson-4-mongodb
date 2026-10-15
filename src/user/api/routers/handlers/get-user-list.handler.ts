import {Request, Response, NextFunction} from "express";
import {userQueryService} from "../../../domain/user.query.service";
import {matchedData, query} from "express-validator";
import {SortQueryFilterType} from "../../../../core/types/sort-query-filter-type";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {mapToUserListPaginatedOutput} from "../mapers/map-to-user-list-paginated-output";
import {setDefaultSortAndPaginationIfNotExist} from "../../../../core/helpers/set-default-sort-and-pagination";
import {SortDirection} from "../../../../core/types/sort-direction";

export const getUserListHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sanitizedQuery = matchedData<SortQueryFilterType>(req, {
            locations: ["query"],
            includeOptionals: true,
        });
        // Ensure sortDirection is SortDirection enum
        let sortDirection: SortDirection;
        if (typeof sanitizedQuery.sortDirection === "string") {
            sortDirection = sanitizedQuery.sortDirection === "asc" ? SortDirection.Asc : SortDirection.Desc;
        } else {
            // Assume it's already SortDirection enum (from default)
            sortDirection = sanitizedQuery.sortDirection as SortDirection;
        }
        const queryWithEnum = {
            ...sanitizedQuery,
            sortDirection,
        };
        const defaults = setDefaultSortAndPaginationIfNotExist(queryWithEnum, 'user');
        const queryInput = {
            ...defaults,
            searchLoginTerm: sanitizedQuery.searchLoginTerm,
            searchEmailTerm: sanitizedQuery.searchEmailTerm,
        };
        const {items, totalCount} = await userQueryService.findUsers(queryInput);
        const {pageNumber, pageSize} = queryInput;
        const pagesCount = Math.ceil(totalCount / pageSize);
        return res.status(HttpStatus.Ok_200).send(mapToUserListPaginatedOutput(items, {
            pagesCount,
            page: pageNumber,
            pageSize,
            totalCount,
        }));
    } catch (err) {
        console.error(err);
        return res.sendStatus(HttpStatus.InternalServerError_500);
    }
}